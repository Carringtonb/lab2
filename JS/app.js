'use strict';

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON',})
  .then(images => {
    images.forEach(image => {
      new Image(image).render();
    });
  });

let collection = [];

function Image(obj){
  this.title = obj.title;
  this.imageUrl = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;

  collection.push(this);
}

Image.prototype.render = function(){
  const template = $('#photo-template').html();

  const $newSection = $('<section></section>');
  $newSection.html(template);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.imageUrl);
  $newSection.find('p').text(this.description);

  $('main').append($newSection);
};

collection.forEach(item => {
  item.render();
});