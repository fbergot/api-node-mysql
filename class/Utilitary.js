module.exports = class Utilitary {

    static array_fields = ['name', 'age', 'email'];

    static makeStringForQueryPrepare(objData) {       
        if (!this.isEmpty(objData)) {
            // loop in prop
            const data = [];
            const props = [];
            for (let prop in objData) {
                // for prop
                props.push(prop);
                // for text
                const str = `${prop} = ?`;
                data.push(str);
            }
            
            // make string for prepare
            let text = "";   
            for (let i = 0; i < data.length; i++) {
                if (i === data.length - 1) {
                    text += data[i];
                } else {
                    text += data[i] + ",";
                }
            }
            // text and props
            return [text , props];          
        } else {
            return [false , false];
        }
    }

    static isEmpty(obj) {
        // cette partie est à refaire pour qu'aucun champ de la requete qui soit hors du tableau(this.array_fields) ne puisse passé plus loin :       
        for (let i = 0; i < this.array_fields.length; i++) {
            if (obj.hasOwnProperty(this.array_fields[i])) {
                return false;
            }
        }
        return true;
    }

    static getValue(props , reqBody) {
       return props.map((el) => {
           return reqBody[el];
         });
    }
}