# Commune 

Commune is a secure chatting app that has a slew of features such as automatic unread chat summaries using the cohere's Command-r, e2e encryption and real-time chatting synchronization.

## Commune Demo 

https://github.com/gkpodder/commune/assets/52678361/493fc049-6c45-4b58-a770-160d21b48a1c



run the backend first

## backend
```
cd backend
npm install
npm start
either use Tailscale or an ngrok http reverse proxy to connect the backend to the frontend.
```

## frontend
```
cd my-app
edit the .env file to correctly point to the backend
npm install
npm start
scan on mobile device. use Expo Go on Android, and Camera on ios
```



## how to use ngrok http reverse proxy
once the backend is running, type `ngrok http 3000` in the terminal to expose the port 3000. ngrok will generate a url for you to use. Paste this into the .env file in the my-app directory, replacing whatever EXPO_PUBLIC_API_URL is in there. The end goal is just to be able to connect the frontend to the backend on port 3000. The url is shown below on the forwarding row. This url needs to be pasted in the .env file.

![image](https://github.com/gkpodder/commune/assets/89824983/80988de1-e5ea-4790-b7a3-3474574536c3)

