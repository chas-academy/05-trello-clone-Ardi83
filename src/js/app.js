import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function() {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');
    DOM.$listCards = $('ul.list-cards');
    
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.delete-card');
    DOM.$titleListInput = $('#list-creation-dialog > input');
  }
  
  function createTabs() {}
  function createDialogs() {}

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }

  function columnsCount() {
    return $('.board').children('div').length;
  }

  function sortera(name) {
    $(name).sortable({
      tolerance: 'pointer', cursor: 'pointer', revert: true, opacity: 0.60, 
      items: '> div:not(.columnList)'
  })
}
sortera('.board');
 
  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();

    let createdList = DOM.$columns.last().prev().clone();
    createdList.show().fadeOut(1).slideToggle(700);
    
   
    let titleListName = DOM.$titleListInput.val();
    if (titleListName === "" || titleListName === null){ return alert("Enter a name for new list please!")}
    createdList.find('.list-header > span').text(titleListName);
    createdList.find('.list-header > button.delete').on('click', deleteList);
    createdList.find('form.new-card').on('submit', createCard);
    createdList.find('.card').remove();
    
    createdList.insertAfter(DOM.$board.find('.column').last().prev());
    sortera('.board');
  }
  


  function deleteList(event) {
    event.preventDefault();
    if(columnsCount() > 2) {
      $(this).closest('.column').remove().fadeIn(1).fadeToggle(600);} else {
        $(this).closest('.column').hide().fadeIn(1).fadeToggle(600);
      }
    console.log("This should delete the list you clicked on");
  }


  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
      
  function listCount () {
    return $('.column').find('ul.list-cards').children('li.card').length;
  }
  
  let cardsName = $(this).find('input[name="title"]').val();
  let newCard = $(`
  <li class="card"> <span class="numberr">
  <span style="background-color:lightblue; padding:2px;">
   No. ${listCount()} </span> - ${cardsName} </span>
  <button class="button delete-card">X</button>
  </li>`);

//==== toggle form new card
    $(newCard).click(function(event){
      event.preventDefault();
      let cardNumberr = $(this).find('span.numberr').text();
      $('#toggle-time').find('#toggle-title-nu').append(cardNumberr);
      $('#toggle-time').toggle();
    });
    
    newCard.find('.delete-card').on('click', deleteCard);
    
    newCard.hide().appendTo($(this).closest('.list-cards')).slideDown(400);
    $('.list-cards').sortable({connectWith: ".list-cards"});
}
// ==== delete toggle form
      $('#toggle-time').find('button.toggle-close').click(function(event){
        event.preventDefault();
        $('#toggle-time').hide();
        $("#toggle-title-nu").text("");
      })
//==== toggle form default card
  $('li.card').click(function(){
    event.preventDefault();
    let cardNumber = $(this).find('span.number').text();
    $('#toggle-time').find('#toggle-title-nu').append(cardNumber);
    $('#toggle-time').toggle();
});

// ==== delete card
  function deleteCard() {
    $(this).closest('.card').slideToggle(400,function() {$(this).closest('.card').remove()});
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();

    bindEvents();
  }

  // All kod här
  return {
    init: init
  };
})();

//usage
$("document").ready(function() {
  jtrello.init();
});
