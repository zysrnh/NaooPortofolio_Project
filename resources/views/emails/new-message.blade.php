<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pesan Baru</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #D1E8FF; font-family: 'Courier New', monospace; padding: 32px 16px; }
    .wrapper { max-width: 600px; margin: 0 auto; }
    .card { background: #F8F3EA; border: 4px solid #0B1957; box-shadow: 8px 8px 0 #0B1957; overflow: hidden; }
    .header { background: #0B1957; padding: 32px 32px 24px; border-bottom: 4px solid #9ECCFA; }
    .header-label { color: #9ECCFA; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 8px; }
    .header-title { color: #F8F3EA; font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; }
    .body { padding: 32px; }
    .field { margin-bottom: 24px; }
    .field-label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #0B1957; opacity: 0.5; margin-bottom: 6px; }
    .field-value { font-size: 15px; font-weight: 700; color: #0B1957; background: #D1E8FF; border: 3px solid #0B1957; padding: 10px 14px; }
    .message-box { background: #fff; border: 3px solid #0B1957; padding: 16px; font-size: 14px; font-weight: 600; color: #0B1957; line-height: 1.7; white-space: pre-wrap; }
    .footer { background: #0B1957; border-top: 4px solid #9ECCFA; padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; }
    .footer-brand { color: #9ECCFA; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; }
    .footer-time { color: #D1E8FF; font-size: 11px; font-weight: 700; opacity: 0.6; }
    .divider { height: 4px; background: #9ECCFA; margin: 24px 0; }
    .badge { display: inline-block; background: #9ECCFA; border: 2px solid #0B1957; padding: 3px 10px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; color: #0B1957; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="header-label">📩 Notifikasi Portfolio</div>
        <div class="header-title">Pesan Baru Masuk</div>
      </div>
      <div class="body">
        <div class="field">
          <div class="field-label">Dari</div>
          <div class="field-value">{{ $message->name }}</div>
        </div>
        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value">{{ $message->email }}</div>
        </div>
        @if($message->subject)
        <div class="field">
          <div class="field-label">Subjek</div>
          <div class="field-value">{{ $message->subject }}</div>
        </div>
        @endif
        <div class="field">
          <div class="field-label">Pesan</div>
          <div class="message-box">{{ $message->message }}</div>
        </div>
        <div class="divider"></div>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <span class="badge">📅 {{ $message->created_at->format('d M Y, H:i') }} WIB</span>
          @if($message->ip_address)
          <span class="badge">🌐 {{ $message->ip_address }}</span>
          @endif
        </div>
      </div>
      <div class="footer">
        <div class="footer-brand">Naoo.id</div>
        <div class="footer-time">Dikirim otomatis via portfolio</div>
      </div>
    </div>
  </div>
</body>
</html>