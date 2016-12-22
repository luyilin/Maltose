(() => {
    class maltose {
        constructor(option) {
            const defaultConfig = {
                wrap: document.getElementsByClassName('maltose')[0],
                target: document.getElementsByTagName('textarea')[0],
                width: '100%',
                maxHeight: '200px',
                api: '../demo/maltose.json'
            };
            for(let i in defaultConfig) {
                if (defaultConfig.hasOwnProperty(i) && !option.hasOwnProperty(i)) {
                    option[i] = defaultConfig[i]
                }
            }

        }
        init(option) {

        }
    }

    if( typeof define === "function" && define.amd ){
        define(maltose);
    }
    else if( typeof module != "undefined" && typeof module.exports != "undefined" ){
        module.exports = maltose;
    }
    else {
        window.maltose = maltose;
    }
})();