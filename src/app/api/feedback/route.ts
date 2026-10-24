import { NextResponse } from 'next/server';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const commentText = body.comment || body.message;

    if (!commentText || typeof commentText !== 'string' || commentText.trim().length === 0) {
      return NextResponse.json({ error: 'Komentar atau pesan wajib diisi.' }, { status: 400 });
    }

    const { name, rating } = body;
    const comment = commentText;

    const ratingNum = Number(rating) || 5;
    const cleanRating = Math.max(1, Math.min(5, ratingNum));
    const cleanName = name && typeof name === 'string' && name.trim() ? name.trim() : 'Anonim';
    const stars = '★'.repeat(cleanRating) + '☆'.repeat(5 - cleanRating);

    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(now);

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram botToken or chatId not configured in env.');
      return NextResponse.json({ error: 'Konfigurasi Telegram belum lengkap di server.' }, { status: 500 });
    }

    const messageHtml = `🌟 <b>Feedback Baru dari Portofolio!</b>\n\n` +
      `👤 <b>Nama:</b> ${escapeHtml(cleanName)}\n` +
      `⭐ <b>Rating:</b> ${stars} (${cleanRating}/5)\n` +
      `💬 <b>Komentar:</b>\n<i>"${escapeHtml(comment.trim())}"</i>\n\n` +
      `🕒 <b>Waktu:</b> ${formattedDate} WIB\n` +
      `🌐 <b>Sumber:</b> Portofolio Web Next.js`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const tgRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageHtml,
        parse_mode: 'HTML',
      }),
    });

    const tgData = await tgRes.json();

    if (!tgData.ok) {
      console.error('Telegram API error:', tgData);
      return NextResponse.json(
        { error: tgData.description || 'Gagal mengirim pesan.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: 'Feedback berhasil dikirim!' });
  } catch (err: unknown) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
