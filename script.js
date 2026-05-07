// script.js - Файл для обработки персонализации

(function() {
  'use strict';
  
  // Ждем полной загрузки DOM
  document.addEventListener('DOMContentLoaded', function() {
    initPersonalization();
    console.log('Personalization script loaded');
  });
  
  function initPersonalization() {
    try {
      // Получаем параметр guest из URL
      const guestType = getGuestTypeFromURL();
      
      if (guestType) {
        applyPersonalization(guestType);
      } else {
        // Если нет параметра, показываем трансфер по умолчанию
        const transferSection = document.getElementById('transfer-section');
        if (transferSection) {
          transferSection.style.display = 'block';
        }
      }
    } catch (error) {
      console.error('Error in personalization:', error);
    }
  }
  
  function getGuestTypeFromURL() {
    try {
      // Способ 1: Используем URLSearchParams
      if (window.URLSearchParams) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('guest');
      }
      
      // Способ 2: Ручной парсинг для старых браузеров
      const query = window.location.search.substring(1);
      const vars = query.split('&');
      
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === 'guest') {
          return decodeURIComponent(pair[1] || '');
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing URL:', error);
      return null;
    }
  }
  
  function applyPersonalization(guestType) {
    const config = getPersonalizationConfig();
    
    // 1. Обновляем заголовок
    updateHeader(guestType, config.guestGreetings);
    
    // 2. Обновляем текст приглашения
    updateInvitationText(guestType, config.useTebeGuests);
    
    // 3. Управляем секцией трансфера
    updateTransferSection(guestType, config.hideTransferGuests);
    
    // 4. Обновляем title страницы
    updatePageTitle(guestType, config.guestGreetings);
  }
  
  function getPersonalizationConfig() {
    return {
      guestGreetings: {
        'default': 'Любi друзi',
        'parents': 'Любi нашi батьки,',
        'vadim_bossan': 'Любі Вадька i Боссан,',
        'dad_ann': 'Любі батько та Анюта,',
        'sanyok': 'Любий Саньок,',
        'max': 'Братан Максим',
        'dima': 'Братан Дмитро',
        'nika': 'Дорога Веронiка,',
        'arisha': 'Дорога Арiша,',
        'granies_v': 'Любi бабуся і дідусь,',
        'grandma_alla': 'Люба Бабушка Алла,',
        'grandma_lena': 'Люба Бабушка Олена,',
        'liza_masha': 'Любі Ліза та Марія,',
        'alyona_yura': "Любі Альоно, Юра, Олег та Софійка,",
        'olya_sergey': 'Любі Оля та Сергій,',
        'natasha_evg': "Любі Наталія, Євген та Микитка,",
        'katya_vitya': 'Любi Катя, Вітя та Вікуля,',
        'slavik_fam': 'Дорога родина Стоянових,',
        'natasha_b': 'Люба Наташа,',
        'anna_jordan': 'Любі Аня та Джордан,',
        'anna_sergey': 'Любі Аня та Серьожка,',
        'tanya_artem': 'Любі Таня та Артем,',
        'yulia_misha': 'Любі Юля та Міша,',
        'alina_ruslan': 'Любі Аліна та Руслан,',
        'kuzmuki': 'Любі Віталій, Тетяна, Валерія та Олександр,',
        'lora_vanya': 'Любі Лариса та Іван,',
        'dasha': 'Дорога Дашуля,',
      },
      
      useTebeGuests: ['sanyok', 'nika', 'arisha', 'natasha_b', 'dasha', 'dima'],
      
      hideTransferGuests: [
        'kuzmuki', 'tanya_artem', 'anna_sergey', 'anna_jordan', 
        'slavik_fam', 'alyona_yura', 'liza_masha', 'sanyok', 
        'dad_ann', 'vadim_bossan', 'dima'
      ]
    };
  }
  
  function updateHeader(guestType, guestGreetings) {
    const headerElement = document.getElementById('header');
    if (!headerElement) return;
    
    if (guestGreetings[guestType]) {
      headerElement.textContent = guestGreetings[guestType];
    } else {
      headerElement.textContent = guestGreetings['default'];
    }
  }
  
  function updateInvitationText(guestType, useTebeGuests) {
    const invitationElement = document.getElementById('invitation-text');
    if (!invitationElement) return;
    
    if (useTebeGuests.includes(guestType)) {
      invitationElement.innerHTML = 'Ми офіційно запрошуємо тебе на<br>наше весілля!';
    } else {
      invitationElement.innerHTML = 'Ми офіційно запрошуємо вас на<br>наше весілля!';
    }
  }
  
  function updateTransferSection(guestType, hideTransferGuests) {
    const transferSection = document.getElementById('transfer-section');
    if (!transferSection) return;
    
    if (hideTransferGuests.includes(guestType)) {
      transferSection.style.display = 'none';
    } else {
      transferSection.style.display = 'block';
    }
  }
  
  function updatePageTitle(guestType, guestGreetings) {
    if (guestGreetings[guestType]) {
      const titleText = guestGreetings[guestType].replace(/,$/, '');
      document.title = titleText + ' | Запрошення на весілля';
    }
  }
  
  // Экспортируем функции для тестирования
  window.WeddingPersonalization = {
    getGuestTypeFromURL,
    applyPersonalization,
    getPersonalizationConfig
  };
  
})();