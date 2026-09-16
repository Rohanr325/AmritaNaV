#!/usr/bin/env python3
"""
AmritaNaV Full-Stack Development Server
Enables HTTP (Port 8000) and Secure HTTPS (Port 8443) with auto-generated SSL
certificates so that Android and mobile phones on local Wi-Fi can use live GPS.
"""

import os
import sys
import ssl
import socket
import shutil
import argparse
import threading
import subprocess
import http.server

HTTP_PORT = 8000
HTTPS_PORT = 8443
CERT_FILE = 'cert.pem'
KEY_FILE = 'key.pem'


def get_lan_ip():
    """Find the local LAN IP (e.g. 192.168.1.x) to connect from mobile phones."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'


def find_openssl():
    """Locate OpenSSL binary from PATH or Git for Windows."""
    p = shutil.which('openssl')
    if p:
        return p
    git_openssl = r'C:\Program Files\Git\usr\bin\openssl.exe'
    if os.path.exists(git_openssl):
        return git_openssl
    return None


def ensure_ssl_certificates(cert_path=CERT_FILE, key_path=KEY_FILE):
    """Generate self-signed SSL cert with Subject Alternative Names (SAN) for localhost and LAN IP."""
    if os.path.exists(cert_path) and os.path.exists(key_path):
        return True

    lan_ip = get_lan_ip()
    openssl = find_openssl()

    if openssl:
        print(f"[*] Generating self-signed SSL certificate for {lan_ip} and localhost...")
        cmd = [
            openssl, 'req', '-x509', '-newkey', 'rsa:2048',
            '-keyout', key_path,
            '-out', cert_path,
            '-days', '365', '-nodes',
            '-subj', f'/CN={lan_ip}',
            '-addext', f'subjectAltName=DNS:localhost,IP:127.0.0.1,IP:{lan_ip}'
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0 and os.path.exists(cert_path) and os.path.exists(key_path):
            print("[+] SSL Certificate successfully generated (cert.pem & key.pem)!")
            return True
        else:
            print("[-] OpenSSL error while generating certificate:", res.stderr)

    return False


class AmritaNavRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP Request Handler with Geolocation Permissions-Policy and explicit MIME mapping."""

    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        '.js': 'application/javascript; charset=utf-8',
        '.mjs': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.html': 'text/html; charset=utf-8',
        '.svg': 'image/svg+xml',
        '.json': 'application/json; charset=utf-8',
    }

    def end_headers(self):
        # Explicitly declare Geolocation permission for modern browsers
        self.send_header('Permissions-Policy', 'geolocation=(self "*")')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        sys.stderr.write(f"[{self.log_date_time_string()}] {args[0]} - {args[1]}\n")


def serve_http(port=HTTP_PORT):
    server = http.server.ThreadingHTTPServer(('0.0.0.0', port), AmritaNavRequestHandler)
    server.serve_forever()


def serve_https(port=HTTPS_PORT, cert_path=CERT_FILE, key_path=KEY_FILE):
    server = http.server.ThreadingHTTPServer(('0.0.0.0', port), AmritaNavRequestHandler)
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ctx.load_cert_chain(cert_path, key_path)
    server.socket = ctx.wrap_socket(server.socket, server_side=True)
    server.serve_forever()


def print_banner(lan_ip, mode='both'):
    banner = [
        "",
        "=" * 68,
        "        AMRITANAV CAMPUS NAVIGATION SERVER (GPS & MOBILE READY)",
        "=" * 68
    ]
    if mode in ('http', 'both'):
        banner.extend([
            " [HTTP - Standard]",
            f"   - PC Desktop:  http://localhost:{HTTP_PORT}",
            f"   - Phone (LAN): http://{lan_ip}:{HTTP_PORT} (GPS restricted on mobile HTTP)"
        ])
    if mode in ('https', 'both'):
        banner.extend([
            "",
            " [HTTPS - Secure (REQUIRED FOR ANDROID & PHONE GPS)]",
            f"   - PC Desktop:  https://localhost:{HTTPS_PORT}",
            f"   - Phone (LAN): https://{lan_ip}:{HTTPS_PORT}  <-- OPEN THIS ON PHONE!",
            "-" * 68,
            " [!] PHONE FIRST-TIME SETUP:",
            f"     1. Open https://{lan_ip}:{HTTPS_PORT} on your Android or mobile phone.",
            "     2. Chrome will show 'Your connection is not private' (self-signed cert).",
            f"     3. Tap 'Advanced' -> 'Proceed to {lan_ip} (unsafe)'.",
            "     4. Tap 'Use Precise GPS' -> Android will prompt for location permission!",
            "=" * 68,
            ""
        ])
    print("\n".join(banner), flush=True)


def main():
    parser = argparse.ArgumentParser(description="AmritaNaV Dev Server with Mobile HTTPS GPS Support")
    parser.add_argument('--mode', choices=['both', 'https', 'http'], default='both',
                        help="Run both HTTP & HTTPS (default), or only HTTPS or HTTP")
    parser.add_argument('--http-port', type=int, default=HTTP_PORT, help="HTTP port (default 8000)")
    parser.add_argument('--https-port', type=int, default=HTTPS_PORT, help="HTTPS port (default 8443)")
    args = parser.parse_args()

    lan_ip = get_lan_ip()

    if args.mode in ('https', 'both'):
        if not ensure_ssl_certificates():
            print("[-] Warning: Failed to generate SSL certificates. Falling back to HTTP only.", flush=True)
            args.mode = 'http'

    print_banner(lan_ip, args.mode)

    threads = []
    if args.mode in ('http', 'both'):
        t_http = threading.Thread(target=serve_http, args=(args.http_port,), daemon=True)
        t_http.start()
        threads.append(t_http)

    if args.mode in ('https', 'both'):
        t_https = threading.Thread(target=serve_https, args=(args.https_port,), daemon=True)
        t_https.start()
        threads.append(t_https)

    try:
        # Keep main thread alive
        for t in threads:
            t.join()
    except KeyboardInterrupt:
        print("\n[!] Server stopped by user.", flush=True)


if __name__ == '__main__':
    main()
