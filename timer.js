// timer.js - Таймер обратного отсчета до свадьбы 16.06.2026

(function() {
  'use strict';
  
  // Ждем полной загрузки DOM
  document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    console.log('Countdown timer initialized');
  });
  
  function initCountdown() {
    // Дата свадьбы: 16 июня 2026, 15:00 (можно изменить время)
    const weddingDate = new Date('June 16, 2026 15:00:00').getTime();
    
    // Получаем элементы для отображения
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const messageEl = document.getElementById('countdown-message');
    
    // Проверяем, что элементы существуют
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
      console.error('Элементы таймера не найдены');
      return;
    }
    
    // Сообщения для разных этапов отсчета
    const messages = {
      year: "Менше року до нашого весілля! 💍",
      month: "Місяць за місяцем наближається наш день ❤️",
      week: "Тиждень за тижнем... Скоро побачимось! 🌸",
      day: "Завтра наш день! Готуємо святкові наряди! 👗",
      today: "СЬОГОДНІ НАШЕ ВЕСІЛЛЯ! 🎉🎊💒",
      passed: "Ми одружені! Дякуємо, що були з нами! 💑"
    };
    
    // Функция форматирования чисел (добавляем ведущий ноль)
    function formatNumber(num) {
      return num < 10 ? '0' + num : num.toString();
    }
    
    // Функция обновления таймера
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      
      // Если дата уже прошла
      if (distance < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        
        if (messageEl) {
          messageEl.textContent = messages.passed;
          messageEl.style.color = '#3a543e';
          messageEl.style.fontWeight = '600';
        }
        
        // Добавляем особый стиль для прошедшей даты
        document.querySelectorAll('.countdown-number').forEach(el => {
          el.style.background = 'linear-gradient(135deg, #f0f7ff, #d4e4ff)';
          el.style.color = '#5a7ca8';
        });
        
        return;
      }
      
      // Вычисляем дни, часы, минуты, секунды
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Сохраняем предыдущие значения для анимации
      const prevDays = parseInt(daysEl.textContent) || 0;
      const prevHours = parseInt(hoursEl.textContent) || 0;
      const prevMinutes = parseInt(minutesEl.textContent) || 0;
      const prevSeconds = parseInt(secondsEl.textContent) || 0;
      
      // Обновляем отображение с анимацией при изменении
      if (days !== prevDays) {
        daysEl.textContent = formatNumber(days);
        daysEl.classList.add('changing');
        setTimeout(() => daysEl.classList.remove('changing'), 300);
      }
      
      if (hours !== prevHours) {
        hoursEl.textContent = formatNumber(hours);
        hoursEl.classList.add('changing');
        setTimeout(() => hoursEl.classList.remove('changing'), 300);
      }
      
      if (minutes !== prevMinutes) {
        minutesEl.textContent = formatNumber(minutes);
        minutesEl.classList.add('changing');
        setTimeout(() => minutesEl.classList.remove('changing'), 300);
      }
      
      // Секунды обновляем всегда
      if (secondsEl.textContent !== formatNumber(seconds)) {
        secondsEl.textContent = formatNumber(seconds);
        secondsEl.classList.add('changing');
        setTimeout(() => secondsEl.classList.remove('changing'), 300);
      }
      
      // Обновляем сообщение в зависимости от оставшегося времени
      if (messageEl) {
        if (days === 0 && hours < 24) {
          messageEl.textContent = messages.today;
          messageEl.style.color = '#3a543e';
          messageEl.style.fontWeight = '600';
          
          // Особый стиль для дня свадьбы
          document.querySelectorAll('.countdown-number').forEach(el => {
            el.style.background = 'linear-gradient(135deg, #fff9e6, #ffe6cc)';
            el.style.color = '#d4a76a';
            el.style.boxShadow = '0 4px 12px rgba(212, 167, 106, 0.3)';
          });
        } 
        else if (days === 1) {
          messageEl.textContent = messages.day;
          messageEl.style.color = '#706359';
          resetTimerStyles();
        } 
        else if (days < 7) {
          messageEl.textContent = messages.week;
          messageEl.style.color = '#6b7c6f';
          resetTimerStyles();
        } 
        else if (days < 30) {
          messageEl.textContent = messages.month;
          messageEl.style.color = '#6b7c6f';
          resetTimerStyles();
        } 
        else if (days < 365) {
          messageEl.textContent = messages.year;
          messageEl.style.color = '#6b7c6f';
          resetTimerStyles();
        } 
        else {
          messageEl.textContent = "Роки любові та щастя попереду 💛";
          messageEl.style.color = '#6b7c6f';
          resetTimerStyles();
        }
      }
    }
    
    // Функция сброса стилей таймера к обычным
    function resetTimerStyles() {
      document.querySelectorAll('.countdown-number').forEach(el => {
        el.style.background = 'linear-gradient(135deg, #f6f4ef, #e8e4da)';
        el.style.color = '#3a543e';
        el.style.boxShadow = '0 4px 12px rgba(58, 84, 62, 0.15)';
      });
    }
    
    // Проверяем особые даты (100 дней, полгода и т.д.)
    function checkSpecialDates(days, messageEl) {
      if (!messageEl) return;
      
      if (days === 100) {
        messageEl.textContent = "💯 Ровно 100 дней до нашего счастья!";
        messageEl.style.color = '#d4a76a';
        messageEl.style.fontWeight = '600';
      }
      else if (days === 182) {
        messageEl.textContent = "⏳ Полгода до нашей свадьбы!";
        messageEl.style.color = '#706359';
      }
      else if (days === 365) {
        messageEl.textContent = "📅 Ровно год до нашего большого дня!";
        messageEl.style.color = '#6b7c6f';
      }
    }
    
    // Обновляем таймер сразу и затем каждую секунду
    updateCountdown();
    
    // Запускаем интервал обновления
    let countdownInterval = setInterval(updateCountdown, 1000);
    
    // Очищаем интервал при уходе со страницы (оптимизация)
    window.addEventListener('beforeunload', function() {
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
    });
    
    // Для отладки: выводим информацию о таймере
    console.log('Таймер обратного отсчета запущен до 16.06.2026');
  }
  
  // Экспортируем функции для тестирования
  window.WeddingCountdown = {
    initCountdown,
    formatNumber: function(num) {
      return num < 10 ? '0' + num : num.toString();
    }
  };
  
})();