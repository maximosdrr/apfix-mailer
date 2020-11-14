"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtml = void 0;
var filter_special_characters_1 = require("./filter-special-characters");
var format_date_1 = require("./format-date");
var text_to_title_1 = require("./text-to-title");
exports.generateHtml = function (mailerObject) {
    var dutys = "";
    for (var i in mailerObject) {
        var currentMailerObject = filter_special_characters_1.filterSpecialCharacters(mailerObject[i]);
        dutys += "\n    <tr\n      onclick=\"openModal('" + currentMailerObject.status + "',\n       '" + text_to_title_1.stringToTitle(currentMailerObject.name) + "',\n        '" + currentMailerObject.period + "',\n         '" + format_date_1.formatDate(currentMailerObject.nextTime) + "',\n          '" + format_date_1.formatDate(currentMailerObject.lastTime) + "', \n          '" + currentMailerObject.estimatedValue + "',\n           '" + currentMailerObject.value + "', \n           '" + currentMailerObject.responsible + "')\"\n          >\n            <td data-column=\"Categoria\">" + text_to_title_1.stringToTitle(currentMailerObject.category) + "</td>\n            <td data-column=\"Pendencia\">" + currentMailerObject.name + "</td>\n            <td data-column=\"Valor Estimado\">" + currentMailerObject.estimatedValue + "</td>\n            <td data-column=\"Ultima Realiza\u00E7\u00E3o\">" + format_date_1.formatDate(currentMailerObject.lastTime) + "</td>\n            <td data-column=\"Proxima Realiza\u00E7\u00E3o\">" + format_date_1.formatDate(currentMailerObject.nextTime) + "</td>\n            <td data-column=\"Status\">" + currentMailerObject.status + "</td>\n          </tr>\n    ";
    }
    return "\n  <!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Pendencias</title>\n  </head>\n  <style>\n    body {\n      background-color: #f3f3f3;\n      font-family: Arial, Helvetica, sans-serif;\n    }\n\n    table {\n      width: 750px;\n      border-collapse: collapse;\n      margin: 50px auto;\n    }\n    table tbody :hover {\n      background-color: rgb(18, 118, 211);\n      cursor: pointer;\n      color: #f3f3f3;\n    }\n\n    /* Zebra striping */\n    tr:nth-of-type(odd) {\n      background: #eee;\n    }\n\n    th {\n      background: #3498db;\n      color: white;\n      font-weight: bold;\n    }\n\n    td,\n    th {\n      padding: 10px;\n      border: 1px solid #ccc;\n      text-align: left;\n      font-size: 18px;\n    }\n\n    @media only screen and (max-width: 760px),\n      (min-device-width: 768px) and (max-device-width: 1024px) {\n      table {\n        width: 100%;\n      }\n\n      /* Force table to not be like tables anymore */\n      table,\n      thead,\n      tbody,\n      th,\n      td,\n      tr {\n        display: block;\n      }\n\n      /* Hide table headers (but not display: none;, for accessibility) */\n      thead tr {\n        position: absolute;\n        top: -9999px;\n        left: -9999px;\n      }\n\n      tr {\n        border: 1px solid #ccc;\n      }\n\n      td {\n        /* Behave  like a \"row\" */\n        border: none;\n        border-bottom: 1px solid #eee;\n        position: relative;\n        padding-left: 50%;\n      }\n\n      td:before {\n        /* Now like a table header */\n        position: absolute;\n        /* Top/left values mimic padding */\n        top: 6px;\n        left: 6px;\n        width: 45%;\n        padding-right: 10px;\n        white-space: nowrap;\n        /* Label the data */\n        content: attr(data-column);\n\n        color: #000;\n        font-weight: bold;\n      }\n    }\n    #logo {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n      align-items: center;\n      justify-content: center;\n      margin-top: 30px;\n    }\n\n    #logo img {\n      max-width: 400px;\n      max-height: 200px;\n      width: 250px;\n      height: 100px;\n    }\n\n    #logo h5 {\n      margin: 0px;\n      margin-top: 15px;\n    }\n\n    #bottom {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n      align-items: center;\n      margin-bottom: 30px;\n      margin-top: 20px;\n    }\n\n    #bottom h5 {\n      margin-left: 30px;\n      margin-right: 30px;\n      text-align: center;\n    }\n\n    #bottom a {\n      text-decoration: none;\n      color: rgb(11, 75, 172);\n      font-family: Arial, sans-serif;\n    }\n    /* MODAL */\n    /* The Modal (background) */\n    .modal {\n      display: none; /* Hidden by default */\n      position: fixed; /* Stay in place */\n      z-index: 1; /* Sit on top */\n      left: 0;\n      top: 0;\n      width: 100%; /* Full width */\n      height: 100%; /* Full height */\n      overflow: auto; /* Enable scroll if needed */\n      background-color: rgb(0, 0, 0); /* Fallback color */\n      background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */\n    }\n\n    /* Modal Content/Box */\n    .modal-content {\n      background-color: #fefefe;\n      margin: 15% auto; /* 15% from the top and centered */\n      padding: 20px;\n      border: 1px solid #888;\n      width: 80%; /* Could be more or less, depending on screen size */\n      animation-name: animatetop;\n      animation-duration: 0.4s;\n    }\n\n    /* The Close Button */\n    .close {\n      color: #aaa;\n      float: right;\n      font-size: 28px;\n      font-weight: bold;\n    }\n\n    .close:hover,\n    .close:focus {\n      color: black;\n      text-decoration: none;\n      cursor: pointer;\n    }\n    /* Add Animation */\n    @keyframes animatetop {\n      from {\n        top: -300px;\n        opacity: 0;\n      }\n      to {\n        top: 0;\n        opacity: 1;\n      }\n    }\n\n    .modal-content label {\n      font-weight: bold;\n    }\n\n    .modal-content p {\n      margin: 0px;\n      padding-top: 5px;\n      padding-bottom: 5px;\n    }\n\n    .modal-content {\n      padding: 20px;\n    }\n  </style>\n\n  <body>\n    <div id=\"logo\">\n      <img\n        src=\"https://i.ibb.co/LZshZ7v/35ea79f3-7533-46b5-8bba-4fdd299f23df.jpg\"\n      />\n      <h5>Data da Gera\u00E7\u00E3o: 13/11/2020</h5>\n    </div>\n    <div id=\"content\">\n      <table>\n        <thead>\n          <tr>\n            <th>Categoria</th>\n            <th>Pendencia</th>\n            <th>Valor Estimado</th>\n            <th>Ultima Realiza\u00E7\u00E3o</th>\n            <th>Proxima Realiza\u00E7\u00E3o</th>\n            <th>Status</th>\n          </tr>\n        </thead>\n        <tbody>\n          " + dutys + "\n        </tbody>\n      </table>\n    </div>\n    <div id=\"bottom\">\n      <h5>\n        *Clique em alguma linha da tabela para exibir os detalhes da pendencia*\n      </h5>\n      <a href=\"http://www.apfix.com.br\" target=\"_blank\">Acessar o Apfix</a>\n    </div>\n    <!-- The Modal -->\n    <div id=\"myModal\" class=\"modal\">\n      <!-- Modal content -->\n      <div class=\"modal-content\">\n        <span class=\"close\">&times;</span>\n        <h3>\n          <label>STATUS:</label>\n          <span id=\"modal-content-status\">?</span>\n        </h3>\n        <p>\n          <label>Pendencia:</label>\n          <span id=\"modal-content-name\">?</span>\n        </p>\n        <p>\n          <label>Periodo:</label>\n          <span id=\"modal-content-period\">a cada ?</span>\n        </p>\n        <p>\n          <label>Proxima Realiza\u00E7\u00E3o:</label>\n          <span id=\"modal-content-next-time\">?</span>\n        </p>\n        <p>\n          <label>Ultima Realiza\u00E7\u00E3o:</label>\n          <span id=\"modal-content-last-time\">?</span>\n        </p>\n        <p>\n          <label>Valor Estimado:</label> R$\n          <span id=\"modal-content-estimated-value\">?</span>\n        </p>\n        <p>\n          <label>Valor da Ultima Realiza\u00E7\u00E3o:</label> R$\n          <span id=\"modal-content-value\">?</span>\n        </p>\n        <p>\n          <label>Empresa Responsavel:</label>\n          <span id=\"modal-content-responsible\">?</span>\n        </p>\n      </div>\n    </div>\n  </body>\n  <script>\n    // Get the modal\n    var modal = document.getElementById(\"myModal\");\n\n    // Get the button that opens the modal\n    var btn = document.getElementById(\"myBtn\");\n\n    // Get the <span> element that closes the modal\n    var span = document.getElementsByClassName(\"close\")[0];\n\n    const openModal = (\n      status,\n      name,\n      period,\n      nextTime,\n      lastTime,\n      estimatedValue,\n      value,\n      responsible\n    ) => {\n      document.getElementById(\"modal-content-status\").innerHTML = status || \"?\";\n      document.getElementById(\"modal-content-name\").innerHTML = name || \"?\";\n      document.getElementById(\"modal-content-period\").innerHTML =\n        period || \"?\";\n      document.getElementById(\"modal-content-next-time\").innerHTML =\n        nextTime || \"?\";\n      document.getElementById(\"modal-content-last-time\").innerHTML =\n        lastTime || \"?\";\n      document.getElementById(\"modal-content-estimated-value\").innerHTML =\n        estimatedValue || \"?\";\n      document.getElementById(\"modal-content-value\").innerHTML = value || \"?\";\n      document.getElementById(\"modal-content-responsible\").innerHTML =\n        responsible || \"?\";\n      modal.style.display = \"block\";\n    };\n    // When the user clicks on the button, open the modal\n\n    // When the user clicks on <span> (x), close the modal\n    span.onclick = function () {\n      modal.style.display = \"none\";\n    };\n\n    // When the user clicks anywhere outside of the modal, close it\n    window.onclick = function (event) {\n      if (event.target == modal) {\n        modal.style.display = \"none\";\n      }\n    };\n  </script>\n</html>\n\n  ";
};