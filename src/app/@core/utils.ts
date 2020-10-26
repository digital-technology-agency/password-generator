export class MakePassword {
    static generate(length: number) {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var digits = '0123456789';
        var specialCharacters = '#!$';
        var charactersLength = characters.length;
        var specialCharactersLength = Math.floor(length / 3);
        var digitsLength = Math.floor(length / 2);
        var result = '';
        for (var i = 0; i < length; i++) {
            if (i == specialCharactersLength) {
                result += specialCharacters.charAt(Math.floor(Math.random() * specialCharactersLength));
                continue;
            }
            if (i == digitsLength) {
                result += digits.charAt(Math.floor(Math.random() * digitsLength));
                continue;
            }
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result += '!';
        return result;
    }
}
