require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');


let token = process.env.TOKEN;

const bot = new TelegramApi(token, {polling: true});

// const chats = {}

// const startGame = async(chatId) => {

// }
// let messageForMe = false
const link = `<a href="https://landao.creativecom.org/">Go to site</a>`

const startBotBtn = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'History', callback_data: 'history'}],
            [{text: 'Mission and objectives', callback_data: 'mission'}],
            [{text: 'Our programmes', callback_data: 'programmes'}],
            [{text: 'Scientific research', callback_data: 'scientific'}],
            [{text: 'Сontact us', callback_data: 'contacts'}],
        ]
    }),
    parse_mode: 'HTML'
}

const thanksBotBtn = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Back', callback_data: 'back'}]
        ]
    }),
    parse_mode: 'HTML',
    disable_web_page_preview: true
}

const startMessage = `<b>Forward to Fundamental Discoveries: The Landau Foundation for Theoretical Physics</b>\n\nThe Landau Foundation supports pioneering research and education in theoretical physics, aiming to push the boundaries of human knowledge and inspire the next generation of scientists and to populise science.\n\n${link}`;

const historyMessage = `<b>History</b>\n\nOrganising and hosting scientific conferences and symposia aimed at sharing knowledge and experience between the world's leading scientists.\nDeveloping practical skills and experience through workshops, masterclasses and projects that provide unique opportunities for real-world application of scientific knowledge and participation in cutting-edge research.\n\n${link}`;

const missionMessage = `<b>Mission and objectives</b>\n\nThe Landau Foundation's mission is to support breakthrough research in theoretical physics, as well as the development and dissemination of knowledge through educational programmes. The Foundation sets the following goals.\nSupporting young scientists and students through scholarships, grants and educational programmes.\nFunding ambitious research projects that can fundamentally change our understanding of natural phenomena.\nOrganising and hosting scientific
conferences and symposia aimed at sharing knowledge and experience between the world's leading scientists.\nDeveloping practical skills and experience through workshops, master classes and projects that provide unique opportunities for real-world application of scientific knowledge and participation in cutting-edge research.\n${link}`;

const programmesMessage = `<b>Our programmes</b>\n\n<b>Dark Matter Research</b>\nThe Foundation supports research on dark matter by focusing on innovative
models that can explain its nature and origin. These models involve interactions of dark matter with new particles and forces, providing opportunities to detect new and unexpected signals in experiments both on Earth and in outer space.\n\n<b>Quantum Gravity and Field Theory</b>\nQuantum Gravity and Field Theory The Foundation contributes to research linking quantum physics and general relativity theory. The programme particularly focuses on holographic dualities that help to understand the connection between quantum gravity and conformal field theories, opening new perspectives for understanding cosmology and particle physics.\n\n<b>Global Experiments in Particle Physics</b>\nThe Landau Foundation is involved in cutting-edge global experiments to study the basic constituents of matter and phenomena that point to new physics beyond the Standard Model. These studies include the Higgs boson, neutrinos and other key aspects shaping our understanding of the universe.\n\n<b>NetZero Programme and Theoretical Physics</b>\nAs part of global initiatives to achieve zero carbon, the Landau Foundation engages in research programmes aimed at developing and applying theoretical approaches for modelling and optimising energy systems. This research contributes to the understanding and improvement of technologies in renewable energy fields such as solar and wind power, which are critical to achieving carbon reduction targets.\nThe Foundation's theoretical physicists analyse the interactions between different forms of energy and the environment, developing strategies for efficient energy use and storage.\n\n${link}`;

const scientificMessage = `<b>Scientific research</b>\n\n<b>Dark Matter Research</b>\nThis research aims to understand the environmental implications and impacts of scientific research and technological developments in theoretical physics. Projects include analysing the carbon footprint of research facilities and developing strategies to minimise the environmental impact of research processes.\n\n<b>Quantum Gravity and Field Theory</b>\nThis research aims to understand the environmental implications and impacts of scientific research and technological developments in theoretical physics. Projects include analysing the carbon footprint of research facilities and developing strategies to minimise the environmental impact of research processes.\n\n<b>Global Experiments in Particle Physics</b>\nThis programme covers a wide range of topics from wave turbulence theory to quantum information and string theory, bringing together theoretical, experimental and numerical approaches to explore fundamental questions in physics and mathematics.\n\n${link}`;

const contactsMessage = `<b>Сontact us</b>\n\n<a href="https://medium.com/@fundlandau">MEDIUM</a>\n\n<a href="https://teletype.in/@landaufund">TELETYPE</a>\n\n<a href="https://github.com/LANDAUFUND">GITHUB</a>\n\n<a href="https://www.reddit.com/user/fundlandau/">REDDIT</a>\n\n<a href="https://www.quora.com/profile/LANDAU-FOUNDATION">QUORA</a>\n\n<a href="https://t.me/landaufund">TELEGRAM</a>\n\n<a href="https://t.me/landaufundchat">CHAT</a>${link}`

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Start Bot'},
    ])
   
    bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start') {
            try {
                return await bot.sendMessage(chatId, startMessage, startBotBtn)
            } catch(e) {
                return await bot.sendMessage(chatId, e.message);
            }
        } else {
            try {
                return bot.sendMessage(chatId, "I don't understand you", thanksBotBtn)
            } catch(e) {
                return await bot.sendMessage(chatId, e.message);
            }
        }
    })

    bot.on('callback_query', async(msg) => {
        try {
            const data = msg.data;
            const chatId = msg.message.chat.id;
            if(data === 'history') {
                return await bot.sendMessage(chatId, historyMessage, thanksBotBtn);
            }
            if(data === 'back') {
                return await bot.sendMessage(chatId, startMessage, startBotBtn);
            }
            if(data === 'mission') {
                bot.sendMessage(chatId, missionMessage, thanksBotBtn);
            } 
            if(data === 'programmes') {
                bot.sendMessage(chatId, programmesMessage, thanksBotBtn);
            } 
            if(data === 'scientific') {
                bot.sendMessage(chatId, scientificMessage, thanksBotBtn);
            } 
            if(data === 'contacts') {
                bot.sendMessage(chatId, contactsMessage, thanksBotBtn);
            } 
            else {
                return bot.sendMessage(chatId, "I don't understand you", thanksBotBtn)
            }
           
        } catch (e) {
            return await bot.sendMessage(chatId, e.message)
        }
    })
    
}
start()