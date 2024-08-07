![Banner](https://github.com/mutasim77/tele-consult/assets/96326525/6b002524-7ea9-4e8e-a95d-89e176e07b5f)
<p align="center">
  💬 Real-time online consultation service for mobile phone operators using WebSockets and OTP-based authentication. 📡
</p>

## 🚀 Introduction
Ever felt stuck with a mobile phone issue and wished for instant expert help? TeleConsult is here to revolutionize customer support in the telecom industry! 📱💬
This cutting-edge web app connects you directly with telecom operators in real-time, solving your mobile service headaches in minutes, not hours. No more endless phone queues or frustrating chatbots – just quick, personalized support when you need it most.
TeleConsult tackles common telecom nightmares:
- Confusing billing issues? **Solved! 💸**
- Network problems giving you a headache? **Fixed! 📶**
- Need help with your new plan? **We've got you covered! 📊**

## 🦄 Features
- 🔐 Secure OTP-based authentication
- 💬 Real-time chat with operators
- 📱 Fully responsive design
- 🔄 Smart queuing system for operator availability
- 👥 Dedicated operator interface for efficient support
- 🌓 Dark mode support
- 📁 Image sharing in chats
- 🔔 Real-time online/offline status updates
- 🌐 Offline mode detection and alert

## 🛠️ Tech Stack
- **🧠 TypeScript** - For type-safe code
- **⚛️ Next.js** - React framework for building the UI
- **💅 Tailwind CSS** - Utility-first CSS framework
- **🔌 Supabase** - Backend as a Service for real-time features, data storage, and authentication

## 🏃‍♂️ Getting Started
#### Prerequisites
- Node.js (v18+ recommended)
- npm | yarn | pnpm

#### Installation
1. Clone the repo:
    ```bash
    git clone https://github.com/mutasim/tele-consult.git
    ```
2. Install dependencies:
    ```
   cd tele-consult
   pnpm install
   ```
3. Set up environment variables (check `.env.example`)
    ```
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```
5. Run the development server:
   ```
   pnpm dev
   ```
6. Open `http://localhost:3000` in your browser 🎉

> [!IMPORTANT]
> While Next.js is lightning-fast in _production_, you might notice slower performance in _development_ mode. For a more accurate representation of the app's speed and to test WebSocket functionality, I strongly recommend running the production build:
> 1. Build the project:
>   ```
>   pnpm build
>   ```
> 2. Start the production server:
>   ```
>   pnpm start
>   ```
> This method will give you a much snappier experience, closer to what end-users will see. It's especially useful for testing _real-time_ features and overall performance. ⚡

## 🌐 Deployment
TeleConsult is deployed on Vercel. Check it out here: [TeleConsult Live](https://tele-consult.vercel.app/)

> [!IMPORTANT]
> The deployment is currently working well, but ~there's an ongoing issue with WebSocket (ws) support due to compatibility between my Next.js version and Vercel's infrastructure~. I'll fix it ASAP.
> ✅ FIXED!

## 📸 Preview
###  /
<img width="1000" alt="home page" src="https://github.com/mutasim77/tele-consult/assets/96326525/060a9272-fe52-49a9-a407-f879ce60deb2">

### 2. /login
<img width="1000" alt="login page" src="https://github.com/mutasim77/tele-consult/assets/96326525/15b3b6d5-ea9d-4e11-b6ef-7ded4a652702">

### 3. /help
<img width="1000" alt="help" src="https://github.com/mutasim77/tele-consult/assets/96326525/6f74d563-dbcb-4a89-962d-4f618ac3e2e0">

### 4. /chat
<img width="1000" alt="chat1" src="https://github.com/mutasim77/tele-consult/assets/96326525/37bfe1c4-cd21-46bf-a6bc-af2a359c5193">

### 4. /chat
<img width="1000" alt="chat2" src="https://github.com/mutasim77/tele-consult/assets/96326525/01dc2245-7ed1-45b5-b201-ffaf3935f74a">

### 5. /operator
<img width="1000" alt="operator" src="https://github.com/mutasim77/tele-consult/assets/96326525/4ce7ded6-e411-418f-8636-6c648beb8d59">

### 6. /chat && /operator
<img width="1000" alt="chatting" src="https://github.com/mutasim77/tele-consult/assets/96326525/29bfeb48-62cc-40e5-8a64-a72809f00576">

## 🔮 Future Plans (TODO)
- 🛡️ Protect routes using middleware
- 📧 Add additional authentication methods
- ⏱️ Implement correct OTP timer
- 🌍 Add Language Translation using AI
- 🧠 Enhance AI model for answering basic questions
- 🎨 Add custom 404 and 500 pages
- 🔔 Add push notifications

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

- Fork the Project
- Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
- Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the Branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## 📜 License
Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

Built with ❤️ by [mutasim](https://www.mutasim.top/blog)
