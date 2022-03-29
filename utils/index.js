const createSlug = () => {
    const slugLength = 6;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( var i = 0; i < slugLength; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * result.length));
    }
    return result;
}

module.exports = {
  createSlug
}