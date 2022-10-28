import { createTransport } from 'nodemailer';

export async function EmailSignin(params: any) {
    const { identifier, url, provider } = params;
    const { host } = new URL(url);

    const transport = createTransport(provider.server);
    const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        html: html({ url, host }),
    });
    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length) {
        throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
    }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string; host: string }) {
    const { url, host } = params;

    const escapedHost = host.replace(/\./g, '&#8203;.');

    return `
    <body>
      <h1>Your Login link to embipi</h1>
      <h3>After clicking in the following link you will be redirected to embipi dashboard</h3>
      <p>
        <a href="${url}">Login to ${escapedHost}</a>
        </p>
        <p>Thank you!!</p>
    </body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`;
}
