/*
start game
white turn
black turn
error
end game
*/

const createBlindStore = () => {
    const { subscribe } = derived([GameStore, BlindStore])
}

export const BlindStore = createBlindStore()

