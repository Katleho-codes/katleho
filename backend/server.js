// server.js
import express from "express";
import { Resend } from "resend";
import cors from "cors";
import "dotenv/config";
import { rateLimit } from "express-rate-limit";

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(cors({ origin: process.env.SITE })); // restrict to your domain

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 5, // Limit each IP to 5 requests per `window` (here, per 5 minutes).
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
});

app.post("/contact", limiter, async (req, res) => {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({ error: "Missing fields" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email" });
    }

    const { error } = await resend.emails.send({
        from: process.env.SITE_EMAIL,
        to: process.env.EMAIL,
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    });

    if (error) return res.status(500).json({ error: "Failed to send" });
    res.json({ success: true });
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
