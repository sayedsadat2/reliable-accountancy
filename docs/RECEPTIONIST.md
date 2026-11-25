# Connecting the website chat to Adrian

## How it fits together
```
Visitor on the website ──► chat bubble (assets/js/chat.js)
                              │  POST /api/web/chat   (a question)
                              │  POST /api/web/lead   (a left message)
                              ▼
                     Adrian server on Render  ──► Retell text agent (same Adrian as SMS/WhatsApp)
                              │
                              └──► Telegram / email alert to you (for left messages)
```
The website never holds a password or API key. All secrets stay on the Render server.

## What you need first
The Adrian server from the `Receptionist` project, already deployed on Render with the four Retell IDs from its Step 4 (`RETELL_CHAT_AGENT_ID` is the one the website uses). The updated server in this package adds the two website endpoints.

## Steps
1. **Update the server.** Replace your GitHub repo files with the updated `Receptionist` folder (new: `lib/webChat.js`, changes in `server.js`, `render.yaml`, `.env.example`, `README.md`, `test/webchat.test.js`). Do not upload `.env`.
2. **Allow your website.** In Render → your service → Environment, add `WEB_ALLOWED_ORIGINS` = `https://www.reliableaccountancy.ca,https://reliableaccountancy.ca` (the `render.yaml` already includes this). Only these websites can use the chat from a browser. Redeploy.
3. **Point the website at it.** In `assets/js/config.js` set
   `receptionist: { endpoint: "https://YOUR-SERVICE.onrender.com", ... }` (no slash at the end). Upload the changed file.
4. **Test.** Open the website, press the chat bubble, ask "Do you do payroll?". Adrian should answer in a few seconds. Then press "Leave a message", send one, and check Telegram.

## What the server does for safety
- Refuses requests from any website not in `WEB_ALLOWED_ORIGINS`.
- Limits each visitor address to 12 messages a minute and 150 a day, and 80 per conversation, so a bot cannot run up your Retell bill.
- Like SMS and WhatsApp, it records that a reply was sent but does not save what the visitor typed.
- Left messages go to your alert channels (Telegram, email, text) and are not stored on the server.
- Adrian's instructions (`knowledge.md`, `prompts/`, and lessons you teach in the admin page) apply to the website exactly as they do on the phone: same hours, no price quotes, no SIN or banking details.

## Troubleshooting
| Symptom | Likely cause |
|---|---|
| Chat answers from the built-in list only | `receptionist.endpoint` is empty in `config.js` |
| Chat says "I can't reach our receptionist" | Render service asleep or down (free plan sleeps; use Starter), `RETELL_CHAT_AGENT_ID` missing, or the website address is not in `WEB_ALLOWED_ORIGINS` |
| Browser console shows a CORS error | Spelling or `http` vs `https` or `www` mismatch in `WEB_ALLOWED_ORIGINS` |
| Left messages do not reach you | No alert channel set on the server (Telegram token and chat id, or SMTP) |

## Voice calls from the website (later)
Adrian already answers calls at +1 365-376-5222 and your office line when forwarded. A "Call Adrian" button can be shown inside the chat by setting `receptionist.showCallButton: true` in `config.js`. A talk-to-Adrian-in-the-browser button would use Retell's web call feature and needs one more small server endpoint; it is not included yet.
