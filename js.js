function generateGrid() {
    deleteGrid(); // Se borra grid en caso de estar creada anteriormente.
    const containerSize = document.getElementById("input_GridSize").value;

    if (containerSize > 64 || containerSize < 1) {
        alert("Invalid value \nPlease input a value between 1 and 64");
    } else {
        let container = document.querySelector('.mainCanvas');
       
        for (let i = 0; i < containerSize; i++) {
            var row = container.appendChild(document.createElement('div'));
            row.classList.add("row");
            for (let j = 0; j < containerSize; j++) {
                var cell = document.createElement('div');
                cell.classList.add('squareCell');
                row.appendChild(cell);
            }
        }
        changeColor(); // Con esto se colorean los cuadros, es posible que el evento este por fuera sin necesidad de que sea llamado en esta parte? 7/1/2024 si lo saco de los corchetes aun asi funciona el coloreado.
    }
}


function changeColor() {
  var squares = document.querySelectorAll('.squareCell');
  var clickMode = document.getElementById('enableClickMode');
  var selectedColor = document.getElementById('selectedColor');
  var rainbowMode = document.getElementById('enableRainbow');
  var darkenMode = document.getElementById('enableDarken');
  var lightenMode = document.getElementById('enableLighten');
  var eraserMode = document.getElementById('enableEraser');

  // Iterar sobre los cuadros y agregar los eventos necesarios
  for (var i = 0; i < squares.length; i++) {
    var square = squares[i];

    // Cambiar color al hacer click
    square.addEventListener("click", function () {

      if (eraserMode.checked) {
        this.style.backgroundColor = "";

      } else if (clickMode.checked) {
        if (darkenMode.checked == true){
          if(!this.style.backgroundColor) { // Verifica si no tiene color asignado
            this.style.backgroundColor = darkenColor(`rgb(255,255,255)`);  
          } else {
            this.style.backgroundColor = darkenColor(this.style.backgroundColor);
          }           
        }

        if (lightenMode.checked == true) {
          if(!this.style.backgroundColor) {
            this.style.backgroundColor = lighenColor(`rgb(0,0,0)`);  
          } else {
            this.style.backgroundColor = lighenColor(this.style.backgroundColor);
          } 
        }

        if (!this.style.backgroundColor) { 
          if (rainbowMode.checked == true) {
            this.style.backgroundColor = getRandomColor();
          } else {
            this.style.backgroundColor = selectedColor.value;
          }
        }        
      }
    });

    // Cambiar color al hacer mouseover
    square.addEventListener("mouseover", function () {
      if (eraserMode.checked && !clickMode.checked) { // con esto se evita que borre de forma mouseover si el clickmode tambien se encontraba activado
        this.style.backgroundColor = "";

      } else if (!clickMode.checked) {
        if (darkenMode.checked == true) {
          if(!this.style.backgroundColor) { // Verifica si no tiene color asignado
            this.style.backgroundColor = darkenColor(`rgb(255,255,255)`);  
          } else {
            this.style.backgroundColor = darkenColor(this.style.backgroundColor);
          }          
        }

        if (lightenMode.checked == true) {
          if(!this.style.backgroundColor) {
            this.style.backgroundColor = lighenColor(`rgb(0,0,0)`);  
          } else {
            this.style.backgroundColor = lighenColor(this.style.backgroundColor);
          } 
        }

        if (!this.style.backgroundColor) { 
          if (rainbowMode.checked == true) {
            this.style.backgroundColor = getRandomColor();
          } else {
            this.style.backgroundColor = selectedColor.value;
          }
        }
      }
    });
  }
}                              

function getRandomColor(){
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string
    return rgb;
}

function deleteGrid () {
    const list = document.getElementById("mainCanvas")
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

function resetGrid() {
    document.querySelectorAll('.squareCell').forEach(item => {
        item.style.backgroundColor = "";
    });
}

function updateGridSizeValue() {
    var range = document.getElementById("input_GridSize");
    var value = document.getElementById("label_GridSize");

    value.innerHTML = [range.value] + " x " + [range.value];
}

function validateBetweenModes(activeCheckbox) {
  var allModes = document.getElementsByClassName("modes");

  if (activeCheckbox.checked) {
    for (var i = 0; i < allModes.length; i++) {
      allModes[i].disabled = true; 
    }   
    activeCheckbox.disabled = false; 
  } else {
    for (var i = 0; i < allModes.length; i++) {
      allModes[i].disabled = false; 
    }
  }  
}

function darkenColor(color) {
  var rgbValues = color.match(/\d+/g); // Esto devuelve un Array con el rgb [255,255,255]
  console.log(typeof(rgbValues[1]))
  var r = Math.max(rgbValues[0] - 25, 0); // Esto se asegura que los valores nunca sean menor que 0, al restarle 25 al valor actual
  var g = Math.max(rgbValues[1] - 25, 0);
  var b = Math.max(rgbValues[2] - 25, 0);
  
  var newRGBValue = `rgb(${r},${g},${b})`;
  return newRGBValue;  
}

function lighenColor(color) {
  var rgbValues = color.match(/\d+/g); // Esto devuelve un Array con el rgb tipo [255,255,255]
  
  var r = Math.min(Number(rgbValues[0]) + 25, 255); // Esto se asegura que los valores nunca sean menor que 0, al restarle 25 al valor actual
  var g = Math.min(Number(rgbValues[1]) + 25, 255);
  var b = Math.min(Number(rgbValues[2]) + 25, 255);
    
  const newRGBValue = `rgb(${r},${g},${b})`;
  return newRGBValue;  
}


