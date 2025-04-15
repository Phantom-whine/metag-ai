import { writable } from "svelte/store";

function customStore() {
    const store = writable({
        tempText: '',
        tempTitle: ''
    });

    return {
        subscribe: store.subscribe,
        setTemp: (title, text) => {
            store.update(state => ({
                ...state,
                tempText: text,
                tempTitle: title
            }));
            console.log(text)
        },
        delTemp: () => {
            store.update(state => ({
                ...state,
                tempText: '',
                tempTitle: '',
            }));
            console.log('DELETED')
        }
    }
}

export const tempStore = customStore();
