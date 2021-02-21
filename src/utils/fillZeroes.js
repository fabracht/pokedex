export const fillZeroes = (id) => {
    const delta = 3 - `${id}`.length;
    const result = delta >= 0 ? "0".repeat(delta) : 0;
    return "#" + result + id;
};
