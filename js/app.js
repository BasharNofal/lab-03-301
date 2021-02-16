'use strict';

let arrOfAnimals = [];
let arrOfKeyWords = [];
let uniqueKeyWords = [];
let index = 0;
let template = $('#template').html();

function Animals(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    arrOfAnimals.push(this);
}


// Animals.prototype.render = function () {
//     let $template = $('#photo-template').clone();
//     $('main').append($template);
//     $template.attr('class', 'new-sections');
//     $template.find('h2').text(this.title);
//     $template.find('img').attr('src', this.image_url);
//     $template.find('p').text(this.description);
//     $template.removeAttr('id');
// }

Animals.prototype.goToMustache = function () {
    $('main').append(Mustache.render(template, this));
};


Animals.readJson = (path) => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax(path, ajaxSettings)
        .then(data => {
            data.forEach(element => {
                var animals = new Animals(element.image_url, element.title, element.description, element.keyword, element.horns);
                arrOfKeyWords.push(element.keyword);
                animals.goToMustache();
            });
            console.log(Animals);

            $.each(arrOfKeyWords, function (i, el) {
                if ($.inArray(el.toLowerCase(), uniqueKeyWords) === -1) uniqueKeyWords.push(el);
                // console.log(el);
            });

            $('#filter').append(`<option>All Animals</option>`);
            uniqueKeyWords.forEach(element => {
                $('#filter').append(`<option>${element}</option>`);
            });

            $('#filter').on('change', (event) => {
                let clickedKeyWord = event.target.value;
                if (index !== 0) {
                    $('section').removeClass('hide-section');
                }
                arrOfAnimals.forEach(element => {
                    if (clickedKeyWord !== element.keyword) {
                        // console.log(element);
                        $(`section:contains(${element.title})`).attr('class', 'hide-section');
                        index++;
                    }
                    if (clickedKeyWord === "All Animals") {
                        $("section").removeClass("hide-section");
                    }
                })
            })
        });
    $('#sort').on('change', (event) => {
        let sortBy = event.target.value;
        // console.log(sortBy);

        if (sortBy === 'Name') {
            $('section').remove();
            // console.log(arrOfAnimals);
            arrOfAnimals.sort((a, b) => {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
            });
        }
        if (sortBy === 'Horns') {
            $('section').remove();
            // console.log(arrOfAnimals);
            arrOfAnimals.sort((a, b) => {
                if (a.horns > b.horns) {
                    return 1;
                }
                if (a.horns < b.horns) {
                    return -1;
                }
                return 0;
            });
        }
    });
};

$('#page-2').click(() => {
    $('section').remove();
    $('#filter').empty();
    uniqueKeyWords = [];
    arrOfKeyWords = [];
    Animals.readJson('../data/page-2.json');
});

$('#page-1').click(() => {
    $('section').remove();
    $('#filter').empty();
    uniqueKeyWords = [];
    arrOfKeyWords = [];
    Animals.readJson('../data/page-1.json');
});
// console.log(uniqueKeyWords);

// console.log(arrOfKeyWords);
// console.log(uniqueKeyWords);

$(() => Animals.readJson('../data/page-1.json'));