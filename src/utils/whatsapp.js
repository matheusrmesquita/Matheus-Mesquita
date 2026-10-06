const WA_NUMBER = '5561982863674';

export const getWhatsAppLink = (language) => {
    const message = language === 'en'
        ? 'Hello, Matheus! I saw your portfolio and would like to discuss a project. 🚀'
        : 'Olá, Matheus! Vi seu portfólio e gostaria de conversar sobre um projeto. 🚀';

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
};
