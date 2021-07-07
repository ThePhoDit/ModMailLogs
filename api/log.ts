import { VercelRequest, VercelResponse } from '@vercel/node';
import Mongo from '../database/Mongo';

const db = Mongo.getDatabase();

export default async (req: VercelRequest, res: VercelResponse) => {
	if (!req.query.id)
		return res.status(404).send('Not found');

	const data = await db.getLog(req.query.id as string);
	if (!data)
		return res.status(404).send('Not found');

	const messages: string[] = [];
	for (const msg of data.messages)
		messages.push(`
<tr>
	<td>
		<div>
			<img src="${msg.author.avatarURL}" style="float: left; width: 30px; height: 30px; border-radius: 50%;">
		</div>
		<div style="padding-left: 15px">
			<h3 class="${msg.type}">${msg.author.username}#${msg.author.discriminator} - ${msg.type}</h3>
			<p class="content-text">${msg.content}</p>
			${msg.attachments && msg.attachments.length > 0 ? `
			<div class="files">
					${msg.attachments.map((f, v) => `<a href="${f}">Image ${v}</a>`).join(' ')}
			</div>` : ''}
		</div>
	</td>
</tr>
`);

	res.send(`
<html lang="en">
<head>
  	<title>${data.title || 'Thread Logs'}</title>
  	<meta charset="UTF-8">
  	<meta name="description" content="Log from ${data.recipient.username}.">
  	<link rel="icon" href="${data.recipient.avatarURL}" type="image/icon type">
  	<style>
        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #2C2F33
        }

        .topnav {
            overflow: hidden;
            background-color: #23272A;
            position: fixed;
            z-index: 1;
        }

        .topnav-title {
            background-color: #99AAB5;
            overflow: hidden;
            width: 213px;
            float: left;
        }

        .topnav-title p {
            float: left;
            font-size: 20px;
            color: #000000;
            padding-left: 16px;
            position: center;
        }

        .topnav-links {
            overflow: hidden;
            float: left;
        }

        .topnav-links a {
            float: left;
            text-align: center;
            padding: 20px 16px;
            text-decoration: none;
            font-size: 20px;
            color: #7289DA;
        }

        .topnav-links a:hover {
            color: white;
        }

        .main {
            padding: 70px 20px;
            position: relative;
        }

        h2 {
            color: #99AAB5;
        }

        h3 {
            color: #7289DA;
        }

        .files {
            color: #fdc75b;
        }

        .files a {
            color: lightskyblue;
            text-decoration: none;
        }

        .files a:hover {
            text-decoration: lightskyblue;
        }

        .content-text {
            color: white;
            padding-left: 20px;
        }
        
        .STAFF_REPLY {
        	color: forestgreen;
        	padding-left: 20px;
        }
        
        .RECIPIENT_REPLY {
        	color: cornflowerblue;
        	padding-left: 20px;
        }
        
        .INTERNAL {
        	color: coral;
        	padding-left: 20px;
        }
        
        table {
        	border-collapse: collapse;
        	width: 100%;
        }
        
        td, tr {
					padding: 15px;
				}
				
				tr {
					border-bottom: 2px solid white;
				}
				
				.time {
					width: 7%;
					text-align: center;
					color: #99AAB5;
					font-size: 13px;
				}
    </style>
</head>

<body>

		<div class="topnav">

        <div class="topnav-title">
            <img src="${data.recipient.avatarURL}" style="float: left; width: 63px; height: 63px">
            <p>${data.title || 'Thread Logs'}</p>
        </div>

        <div class="topnav-links">
            <a href="https://mail.phodit.xyz">ModMail Project</a>
            <a href="https://discord.gg/aUNhdFD">Support Server</a>
        </div>

    </div>
    
    <div class="main">
    		<div>
            <h2>Log from user ${data.recipient.username}#${data.recipient.discriminator}</h2>
            ${data.note ? `<p class="content-text">Note: ${data.note}</p>` : ''}
            <hr>
        </div>
        
        <table>
        	${messages.join('')}
				</table>
		</div>
</body>
</html>
`);

};