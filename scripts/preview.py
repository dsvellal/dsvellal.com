"""Serve the checked site-impact public build on loopback with GitHub Pages-style URLs."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "live" if (ROOT / "live").is_dir() else ROOT / "site-impact" / "dist-public"


class PagesHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        target = Path(super().translate_path(path))
        if target != BUILD and not target.suffix:
            page = target.with_suffix(".html")
            if page.is_file():
                return str(page)
        return str(target)

    def list_directory(self, path):
        self.send_error(404)
        return None

    def send_error(self, code, message=None, explain=None):
        if code != 404:
            return super().send_error(code, message, explain)
        content = (BUILD / "404.html").read_bytes()
        self.send_response(code)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(content)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=4322)
    args = parser.parse_args()
    if not (BUILD / "evidence.html").is_file():
        parser.exit(1, "Build the public site before starting its preview.\n")
    handler = partial(PagesHandler, directory=str(BUILD))
    with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
        print(f"Portfolio preview at http://127.0.0.1:{server.server_port}/", flush=True)
        server.serve_forever()
