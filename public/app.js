// require('dotenv').config();
const $input = $('#userInput');
const $show = $('#show-input');
//submit id
const $translation = $("#translation");
const translateFunction = (event) => {
    event.preventDefault();
    $.ajax({
        url: `https://api-free.deepl.com/v2/translate?auth_key=3e2993ef-18a0-f0f4-1663-4ad7b859cfe9:fx&text=${$input.val()}&target_lang=JA`
    }).then((data) => {
        $translation.text(`${data.translations[0].text}`);
        $show.text(`${$input.val()}`)
        $translation.show();
        $show.show();
    },
        (error) => {
            console.log(`AJAX problem`);
        });
};
$('.translate-form').on('submit', translateFunction);
