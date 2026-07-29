"""
TBBT Idle Game - APK Download Server
Serves the game APK on port 8888 with a premium download page.
"""
import http.server
import socketserver
import os

PORT = 8888
APK_FILE = os.path.join("android", "app", "build", "outputs", "apk", "debug", "app-debug.apk")
APK_FALLBACK = os.path.join("public", "tbbt-idle-game.apk")

def get_apk_path():
    base = os.path.dirname(os.path.abspath(__file__))
    fresh = os.path.join(base, APK_FILE)
    if os.path.exists(fresh):
        return fresh
    fallback = os.path.join(base, APK_FALLBACK)
    if os.path.exists(fallback):
        return fallback
    return None

class DownloadHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/" or self.path == "/index.html":
            self.serve_page()
        elif self.path == "/download":
            self.serve_download()
        else:
            self.send_error(404, "Not Found")

    def serve_page(self):
        apk = get_apk_path()
        file_size = os.path.getsize(apk) if apk else 0
        size_mb = round(file_size / (1024 * 1024), 1)

        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TBBT: Idle Bazinga - Download APK</title>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            min-height: 100vh;
            background: #070b14;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', sans-serif;
            color: #e2e8f0;
            overflow-x: hidden;
        }}
        .bg-grid {{
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-image:
                linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 0;
        }}
        .bg-glow {{
            position: fixed; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 600px; height: 600px;
            background: radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%);
            z-index: 0;
        }}
        .card {{
            position: relative; z-index: 1;
            background: linear-gradient(145deg, rgba(15,23,42,0.95), rgba(30,27,75,0.9));
            backdrop-filter: blur(24px);
            border: 1px solid rgba(245,158,11,0.2);
            border-radius: 28px;
            padding: 52px 48px;
            max-width: 480px;
            width: 92%;
            text-align: center;
            box-shadow:
                0 0 80px rgba(245,158,11,0.06),
                0 32px 64px rgba(0,0,0,0.6),
                inset 0 1px 0 rgba(255,255,255,0.04);
        }}
        .badge {{
            display: inline-block;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #f59e0b;
            background: rgba(245,158,11,0.1);
            border: 1px solid rgba(245,158,11,0.25);
            border-radius: 20px;
            padding: 5px 16px;
            margin-bottom: 20px;
        }}
        .logo {{
            font-family: 'Press Start 2P', monospace;
            font-size: 22px;
            line-height: 1.8;
            margin-bottom: 6px;
        }}
        .logo .t1 {{ color: #f59e0b; }}
        .logo .t2 {{ color: #ef4444; }}
        .tagline {{
            font-size: 12px;
            color: #64748b;
            margin-bottom: 36px;
            letter-spacing: 3px;
            text-transform: uppercase;
        }}
        .phone-mockup {{
            font-size: 64px;
            margin-bottom: 28px;
            filter: drop-shadow(0 8px 24px rgba(245,158,11,0.2));
        }}
        .stats {{
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-bottom: 32px;
        }}
        .stat {{
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 14px;
            padding: 14px 16px;
            min-width: 90px;
        }}
        .stat-val {{
            font-size: 18px;
            font-weight: 900;
            color: #f59e0b;
        }}
        .stat-label {{
            font-size: 9px;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 3px;
        }}
        .dl-btn {{
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 18px 48px;
            font-size: 14px;
            font-weight: 800;
            font-family: 'Inter', sans-serif;
            color: #0f172a;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            border: none;
            border-radius: 16px;
            cursor: pointer;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 3px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow:
                0 6px 20px rgba(245,158,11,0.35),
                0 0 40px rgba(245,158,11,0.1);
        }}
        .dl-btn:hover {{
            transform: translateY(-4px) scale(1.03);
            box-shadow:
                0 12px 32px rgba(245,158,11,0.45),
                0 0 60px rgba(245,158,11,0.2);
        }}
        .dl-btn:active {{ transform: translateY(0) scale(0.97); }}
        .dl-btn svg {{ flex-shrink: 0; }}
        .features {{
            margin-top: 28px;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            justify-content: center;
        }}
        .ftag {{
            font-size: 9px;
            padding: 4px 10px;
            background: rgba(245,158,11,0.08);
            border: 1px solid rgba(245,158,11,0.15);
            border-radius: 20px;
            color: #a3873a;
            letter-spacing: 0.5px;
        }}
        .note {{
            margin-top: 20px;
            font-size: 10px;
            color: #334155;
            line-height: 1.6;
        }}
        .note a {{ color: #f59e0b; text-decoration: none; }}
        @keyframes fadeUp {{
            from {{ opacity: 0; transform: translateY(30px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}
        .card {{ animation: fadeUp 0.8s ease-out; }}
    </style>
</head>
<body>
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>
    <div class="card">
        <div class="badge">Android APK</div>
        <div class="phone-mockup">📱</div>
        <div class="logo">
            <span class="t1">TBBT</span><br>
            <span class="t2">IDLE BAZINGA</span>
        </div>
        <div class="tagline">The Big Bang Theory</div>
        <div class="stats">
            <div class="stat">
                <div class="stat-val">{size_mb} MB</div>
                <div class="stat-label">Size</div>
            </div>
            <div class="stat">
                <div class="stat-val">APK</div>
                <div class="stat-label">Format</div>
            </div>
            <div class="stat">
                <div class="stat-val">v2.0</div>
                <div class="stat-label">Version</div>
            </div>
        </div>
        <a href="/download" class="dl-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Install APK
        </a>
        <div class="features">
            <span class="ftag">12 Characters</span>
            <span class="ftag">PVP Arena</span>
            <span class="ftag">Guild Wars</span>
            <span class="ftag">Chat System</span>
            <span class="ftag">Gacha</span>
            <span class="ftag">Campaign</span>
            <span class="ftag">Robots</span>
            <span class="ftag">Equipment</span>
            <span class="ftag">Tower</span>
            <span class="ftag">Prestige</span>
            <span class="ftag">Battle Pass</span>
            <span class="ftag">Minigames</span>
        </div>
        <div class="note">
            Enable <strong>"Install from Unknown Sources"</strong> in Android settings.<br>
            Built with Capacitor. Requires Android 6.0+
        </div>
    </div>
</body>
</html>"""
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode("utf-8"))

    def serve_download(self):
        apk = get_apk_path()
        if not apk:
            self.send_error(404, "APK not found. Build failed?")
            return

        file_size = os.path.getsize(apk)
        self.send_response(200)
        self.send_header("Content-Type", "application/vnd.android.package-archive")
        self.send_header("Content-Disposition", 'attachment; filename="tbbt-idle-bazinga.apk"')
        self.send_header("Content-Length", str(file_size))
        self.end_headers()

        with open(apk, "rb") as f:
            while True:
                chunk = f.read(65536)
                if not chunk:
                    break
                self.wfile.write(chunk)

    def log_message(self, format, *args):
        print("[%s] %s" % (self.log_date_time_string(), format % args))


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    apk = get_apk_path()
    if apk:
        size_mb = round(os.path.getsize(apk) / (1024 * 1024), 1)
        print("  APK: %s (%s MB)" % (apk, size_mb))
    else:
        print("  WARNING: No APK found!")

    with socketserver.TCPServer(("0.0.0.0", PORT), DownloadHandler) as httpd:
        print("")
        print("  TBBT Idle Bazinga - APK Download Server")
        print("  ----------------------------------------")
        print("  Local URL: http://localhost:%d" % PORT)
        print("  LAN URL: http://192.168.68.116:%d" % PORT)
        print("  Press Ctrl+C to stop")
        print("")
        httpd.serve_forever()
