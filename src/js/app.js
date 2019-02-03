import $ from 'jquery';

// require('webpack-jquery-ui');
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
    createdList.find('.delete-card').on('click', deleteCard);
    
    createdList.insertAfter(DOM.$board.find('.column').last().prev());
    
    // createdList.sortable();
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
    let newCard = $(this).closest('ul.list-cards').find('li.card').clone().last();
    newCard.show();

    let cardsName = $(this).find('input[name="title"]').val();
    newCard.find('span.number').text(`No. ${listCount()} - ${cardsName}`);
    
    newCard.find('.delete-card').on('click', deleteCard);

    newCard.insertAfter($(this).closest('ul.list-cards').find('li.card').last());
  }

  function deleteCard() {
    $(this).closest('.card').remove();
    console.log("This should delete the card you clicked on");
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
