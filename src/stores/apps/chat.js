import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { sub } from 'date-fns';

export const useChatStore = defineStore({
    id: 'chat',
    state: () => (chatType) => ({
        chats: [],
        chatContent: 1
    }),
    getters: {
        // Get Chats from Getters
        // getChats(state) {
        //     return state.chats;
        // }
    },
    actions: {
        // Fetch Chat from action
        async fetchChats() {
            try {
                const data = await axios.get('/api/data/chat/ChatData');
                this.chats = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        //select chat
        SelectChat(itemID) {
            this.chatContent = itemID;
        },
        sendMsg(itemID, item) {
            const newMessage = {
                id: itemID,
                msg: item,
                type: 'text',
                attachments: [],
                createdAt: sub(new Date(), { seconds: 1 }),
                senderId: itemID
            };

            this.chats = this.chats.filter((chat) => {
                return chat.id === itemID
                    ? {
                          ...chat,
                          ...chat.chatHistory.push(newMessage)
                      }
                    : chat;
            });
        }
    }
});
