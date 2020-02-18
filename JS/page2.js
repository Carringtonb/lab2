'use strict';

$.ajax('data/page-2.json', {method: 'GET', dataType: 'JSON',})
  .then(images => {
    images.forEach(image => {
      new Image(image);
    });
      collection.forEach(item => {
        $('#collection').append(item.create());
      });
    addDropDownOptions();
    filter();
    sort();
  });

let collection = [];
let allKeywords = [];

function Image(obj){
  this.title = obj.title;
  this.imageUrl = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  collection.push(this);
  addKeyword(obj.keyword);
}

function addKeyword(keyword){
  if(!allKeywords.includes(keyword)){
    allKeywords.push(keyword);
  }
}

function addDropDownOptions (){
  const $dropdown = $('.filter');
  allKeywords.forEach(keyword => {
    const $newOption = $(`<option value="${keyword}">${keyword}</option>`);
    $dropdown.append($newOption);
  });
}

Image.prototype.create = function(){
  let template = $('#horns-template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
};

function filter(){
  $('.filter').on('change', function(){
    $('section').hide();
    $('section').each((index,element) => {
      if(this.value === $(element).attr('data-keyword')){
        $(element).show();
      } else if(this.value === 'default'){
        $('section').show();
      };
    });
  });
}

function sort(){
  $('.sort').on('change', function(){
    $('section').remove();
    if(this.value === 'title'){
      collection.sort((a,b)=>{
        return a.title < b.title ? -1 : 1;
      })
    } else if(this.value === 'horns'){
      
      collection.sort((a,b)=>{
        return a.horns < b.horns ? -1 : 1;
      });
    };
    
    collection.forEach(item => {
      $('#collection').append(item.create());
    });
  })
}
