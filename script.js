    // ============================================================
    // CLASE SECTION: Crea una sección con título y un diálogo modal
    // que contiene el contenido del proyecto.
    // ============================================================
    class section {
        constructor(content, titulo) {
            // Elemento que muestra el título del proyecto
            this.t = document.createElement('p');
            this.t.textContent = titulo;

            // Botones para abrir y cerrar el modal
            this.abrir = document.createElement('button');
            this.cerrar = document.createElement('button');
            this.abrir.textContent = 'Abrir Proyecto';
            this.cerrar.textContent = 'Cerrar Proyecto';

            // Diálogo modal que contendrá el contenido del proyecto
            this.dialog = document.createElement('dialog');
            
            // Evento: abrir el modal de forma nativa
            this.abrir.addEventListener("click", () => {
                this.dialog.showModal();
            });
            
            // Evento: cerrar el modal
            this.cerrar.addEventListener("click", () => {
                this.dialog.close();
            });

            // Contenedor principal de la sección
            this.section = document.createElement('section');
            this.section.appendChild(this.t);
            this.section.appendChild(this.abrir);
            
            // Agregar contenido y botón cerrar al diálogo
            this.dialog.appendChild(content);
            this.dialog.appendChild(this.cerrar);
            this.section.appendChild(this.dialog);
        }
    }

    // ============================================================
    // PROYECTO 1: Contador Inteligente
    // Almacena el valor en localStorage y cambia de color según el signo
    // ============================================================
    class prompt {
        constructor() {
            this.div = document.createElement('div');

            // Párrafo que muestra el número guardado (0 por defecto)
            this.p = document.createElement('p');
            this.p.textContent = localStorage.getItem('number') !== null ? localStorage.getItem('number') : '0';

            // Cambiar color según el valor: gris(0), verde(>0), rojo(<0)
            if (Number(this.p.textContent) === 0) {
                this.p.style.color = 'gray';
            } else if (Number(this.p.textContent) > 0) {
                this.p.style.color = 'green';
            } else {
                this.p.style.color = 'red';
            }

            // Al hacer clic en el párrafo, actualiza el color (por si cambió externamente)
            this.div.addEventListener('click', () => {
                if (Number(this.p.textContent) === 0) {
                    this.p.style.color = 'gray';
                } else if (Number(this.p.textContent) > 0) {
                    this.p.style.color = 'green';
                } else {
                    this.p.style.color = 'red';
                }
            });

            // Botón +1: incrementa y guarda en localStorage
            this.mas = document.createElement('button');
            this.mas.textContent = '+1';
            this.mas.addEventListener('click', () => {
                this.p.textContent = Number(this.p.textContent) + 1;
                localStorage.setItem('number', this.p.textContent);
            });

            // Botón -1: decrementa y guarda
            this.menos = document.createElement('button');
            this.menos.textContent = '-1';
            this.menos.addEventListener('click', () => {
                this.p.textContent = Number(this.p.textContent) - 1;
                localStorage.setItem('number', this.p.textContent);
            });

            // Botón Reiniciar: vuelve a 0 y guarda
            this.reset = document.createElement('button');
            this.reset.textContent = 'Reiniciar';
            this.reset.addEventListener('click', () => {
                this.p.textContent = 0;
                localStorage.setItem('number', this.p.textContent);
            });

            // Ensamblar el componente
            this.div.appendChild(this.p);
            this.div.appendChild(this.mas);
            this.div.appendChild(this.menos);
            this.div.appendChild(this.reset);
        }
    }

    // Instanciar y agregar Proyecto 1 al main
    const a1 = new prompt();
    const s1 = new section(a1.div, 'Proyecto 1: Contador Inteligente');
    main.appendChild(s1.section);

    // ============================================================
    // CLASE FILA: Representa una tarea individual en la lista
    // ============================================================
    class fila {
        constructor(texto, list, l) {
            this.item = document.createElement('li');
            this.p = document.createElement('p');
            this.p.textContent = texto + ' ';
            this.s = texto;  // Guarda el texto original para eliminarlo luego
            this.item3 = document.createElement('div');  // Contenedor de botones

            // Botón Tachar: aplica o quita texto tachado
            this.item1 = document.createElement('button');
            this.item1.textContent = 'Tachar';
            this.item1.addEventListener('click', () => {
                if (this.p.style.textDecoration === 'line-through') {
                    this.p.style.textDecoration = 'none';
                } else {
                    this.p.style.textDecoration = 'line-through';
                }
            });
            this.item3.appendChild(this.item1);
            
            // Estilos para alinear horizontalmente
            this.item.style.display = 'flex';
            this.item.style.justifyContent = 'space-between';
            this.item.style.alignItems = 'center';

            // Botón Eliminar: remueve la tarea del DOM y de localStorage
            this.item2 = document.createElement('button');
            this.item2.textContent = 'Eliminar';
            this.item2.addEventListener('click', () => {
                list = localStorage.getItem('JD') !== null && localStorage.getItem('JD') !== '' 
                        ? localStorage.getItem('JD').split(",") : [];
                l.removeChild(this.item);  // Eliminar del DOM
                localStorage.removeItem('JD');
                // Filtrar la tarea eliminada de la lista
                list = list.filter(i => i !== this.s);
                localStorage.setItem('JD', list);
            });
            this.item3.appendChild(this.item2);
            this.item.appendChild(this.p);
            this.item.appendChild(this.item3);
        }
    }

    // ============================================================
    // PROYECTO 2: Lista de Tareas (To-Do List)
    // Permite agregar, tachar y eliminar tareas con persistencia en localStorage
    // ============================================================
    class lista {
        constructor() {
            this.i = document.createElement('input');   // Campo para nueva tarea
            this.i.placeholder = 'Escribe...';
            this.b = document.createElement('button'); // Botón agregar
            this.b.textContent = 'Ingresar Tarea';
            this.l = document.createElement('ol');     // Lista ordenada de tareas
            
            // Cargar tareas guardadas desde localStorage
            this.m = localStorage.getItem('JD');
            this.list = this.m !== null && this.m !== '' ? this.m.split(",") : [];
            
            // Crear una fila por cada tarea existente
            for (const e of this.list) {
                const ob = new fila(e, this.list, this.l);
                this.l.appendChild(ob.item);
            }
            
            // Evento para agregar nueva tarea
            this.b.addEventListener('click', () => {
                const ob = new fila(this.i.value, this.list, this.l);
                this.l.appendChild(ob.item);
                this.list.push(this.i.value);
                localStorage.setItem('JD', this.list);
                this.i.value = '';  // Limpiar input
            });
            
            // Ensamblar el componente
            this.div = document.createElement('div');
            this.d = document.createElement('div');
            this.dd = document.createElement('div');
            this.d.appendChild(this.b);
            this.d.appendChild(this.i);
            this.dd.appendChild(this.l);
            this.div.appendChild(this.d);
            this.div.appendChild(this.dd);
        }
    }

    const a2 = new lista();
    const s2 = new section(a2.div, 'Proyecto 2: Lista de Tareas (To-Do List)');
    main.appendChild(s2.section);

    // ============================================================
    // PROYECTO 3: Adivina el Número
    // Juego donde se debe adivinar un número aleatorio entre 1 y 100
    // ============================================================
    class numero {
        constructor() {
            this.div = document.createElement('div');
            this.p = document.createElement('p');
            this.p.textContent = 'Te diré si acertaste';
            this.f = 0;               // Contador de intentos fallidos
            this.w = false;           // Bandera de si ya se adivinó
            this.pp = document.createElement('p');
            this.pp.textContent = `Intentos fallidos: ${this.f}`;
            
            this.bb = document.createElement('button');
            this.bb.textContent = 'Reintentar';
            this.bb.disabled = true;  // Solo habilitado cuando se acierta
            
            this.i = document.createElement('input');
            this.i.type = 'number';
            this.i.placeholder = 'Escribe un número';
            
            this.b = document.createElement('button');
            this.b.textContent = 'Adivina el número';
            
            // Número secreto aleatorio entre 1 y 100
            this.n = Math.floor(Math.random() * 100) + 1;
            
            // Evento: verificar el número ingresado
            this.b.addEventListener('click', () => {
                if (!this.w) {
                    if (this.i.value === '') {
                        this.p.textContent = 'Debes ingresar un número';
                    } else if (this.n > this.i.value) {
                        this.p.textContent = 'Muy bajo';
                        this.f += 1;
                        this.pp.textContent = `Intentos fallidos: ${this.f}`;
                    } else if (this.n < this.i.value) {
                        this.p.textContent = 'Muy Alto';
                        this.f += 1;
                        this.pp.textContent = `Intentos fallidos: ${this.f}`;
                    } else {
                        this.p.textContent = 'Correcto';
                        this.w = true;
                        this.b.disabled = true;
                        this.bb.disabled = false;
                    }
                    this.i.value = '';
                }
            });
            
            // Evento: reiniciar el juego
            this.bb.addEventListener('click', () => {
                this.w = false;
                this.b.disabled = false;
                this.bb.disabled = true;
                this.f = 0;
                this.pp.textContent = `Intentos fallidos: ${this.f}`;
                this.p.textContent = 'Te diré si acertaste';
                this.n = Math.floor(Math.random() * 100) + 1;
            });
            
            // Ensamblar componente
            this.div.appendChild(this.p);
            this.div.appendChild(this.b);
            this.div.appendChild(this.i);
            this.div.appendChild(this.pp);
            this.div.appendChild(this.bb);
        }
    }

    const a3 = new numero();
    const s3 = new section(a3.div, 'Proyecto 3: Adivina el Número');
    main.appendChild(s3.section);

    // ============================================================
    // CLASES AUXILIARES PARA LA CALCULADORA
    // ============================================================
    class calculate1 {
        constructor(texto, ins1, ins2) {
            this.n = 10;  // Límite máximo de caracteres en pantalla
            this.b = document.createElement('button');
            this.b.textContent = texto;
            this.b.addEventListener('click', () => {
                if (ins1.textContent.length < this.n) {
                    ins1.textContent += ins2;
                }
            });
        }
    }

    class calculate2 {
        constructor(texto, ins1, ins2) {
            this.n = 10;
            this.b = document.createElement('button');
            this.b.textContent = texto;
            this.b.addEventListener('click', () => {
                if (ins1.textContent.length < this.n) {
                    ins1.textContent += ins2;
                }
            });
        }
    }

    // ============================================================
    // PROYECTO 4: Calculadora Básica
    // Permite realizar operaciones aritméticas simples
    // ============================================================
    class calculator {
        constructor() {
            this.p = document.createElement('p');  // Pantalla de la calculadora

            // Botón de igual (=) para evaluar la expresión
            this.c1 = document.createElement('button');
            this.c1.textContent = '=';
            
            // Botón de limpiar (c)
            this.c2 = document.createElement('button');
            this.c2.textContent = 'c';

            this.r = 0;
            
            // Evaluar la expresión matemática
            this.c1.addEventListener('click', () => {
                try {
                    this.r = eval(this.p.textContent);
                    if (isNaN(this.r) || !isFinite(this.r)) {
                        this.r = 'Error: División entre cero';
                    }
                } catch (e) {
                    this.r = 'Error: Operación no válida';
                }
                this.p.textContent = this.r;
            });
            
            // Limpiar pantalla
            this.c2.addEventListener('click', () => {
                this.p.textContent = '';
            });

            // Botones de operadores
            this.b1 = new calculate2('+', this.p, '+');
            this.b2 = new calculate2('-', this.p, '-');
            this.b3 = new calculate2('*', this.p, '*');
            this.b4 = new calculate2('/', this.p, '/');

            // Botones numéricos
            this.a0 = new calculate1('0', this.p, '0');
            this.a1 = new calculate1('1', this.p, '1');
            this.a2 = new calculate1('2', this.p, '2');
            this.a3 = new calculate1('3', this.p, '3');
            this.a4 = new calculate1('4', this.p, '4');
            this.a5 = new calculate1('5', this.p, '5');
            this.a6 = new calculate1('6', this.p, '6');
            this.a7 = new calculate1('7', this.p, '7');
            this.a8 = new calculate1('8', this.p, '8');
            this.a9 = new calculate1('9', this.p, '9');
            
            // Ensamblar el teclado en filas
            this.div = document.createElement('div');
            this.div.style.textAlign = 'right';
            this.div1 = document.createElement('section');
            this.div2 = document.createElement('section');
            this.div3 = document.createElement('section');
            this.div4 = document.createElement('section');
            
            this.div.appendChild(this.p);

            // Fila 1: 1 2 3 +
            this.div1.appendChild(this.a1.b);
            this.div1.appendChild(this.a2.b);
            this.div1.appendChild(this.a3.b);
            this.div1.appendChild(this.b1.b);

            // Fila 2: 4 5 6 -
            this.div2.appendChild(this.a4.b);
            this.div2.appendChild(this.a5.b);
            this.div2.appendChild(this.a6.b);
            this.div2.appendChild(this.b2.b);

            // Fila 3: 7 8 9 *
            this.div3.appendChild(this.a7.b);
            this.div3.appendChild(this.a8.b);
            this.div3.appendChild(this.a9.b);
            this.div3.appendChild(this.b3.b);

            // Fila 4: = c 0 /
            this.div4.appendChild(this.c1);
            this.div4.appendChild(this.c2);
            this.div4.appendChild(this.a0.b);
            this.div4.appendChild(this.b4.b);

            this.div.appendChild(this.div1);
            this.div.appendChild(this.div2);
            this.div.appendChild(this.div3);
            this.div.appendChild(this.div4);
        }
    }

    const a4 = new calculator();
    const s4 = new section(a4.div, 'Proyecto 4: Calculadora Básica');
    main.appendChild(s4.section);

    // ============================================================
    // PROYECTO 5: Cambiador de Colores Aleatorios
    // Cambia el color de fondo y permite copiar el valor RGB/RGBA
    // ============================================================
    class color {
        constructor() {
            this.w = 'rgba(255,255,255,0.8)';  // Color inicial

            // Botón para generar un color aleatorio
            this.b = document.createElement('button');
            this.b.textContent = 'Cambiar Color';
            this.b.addEventListener('click', () => {
                const a1 = Math.floor(Math.random() * 255) + 1;
                const a2 = Math.floor(Math.random() * 255) + 1;
                const a3 = Math.floor(Math.random() * 255) + 1;
                const a4 = Math.floor(Math.random() * 1) + 1;
                this.w = `rgba(${a1},${a2},${a3},${a4})`;
                document.body.style.backgroundColor = this.w;
            });

            // Botón para copiar el color actual al portapapeles
            this.bb = document.createElement('button');
            this.bb.textContent = 'Copiar Color';
            this.bb.addEventListener('click', () => {
                navigator.clipboard.writeText(this.w)
                    .then(() => {
                        alert('Texto copiado: ' + this.w);
                    })
                    .catch(err => {
                        console.error('Error al copiar: ', err);
                    });
            });
            
            this.div = document.createElement('div');
            this.div.appendChild(this.b);
            this.div.appendChild(this.bb);
        }
    }

    const a5 = new color();
    const s5 = new section(a5.div, 'Proyecto 5: Cambiador de Colores Aleatorios');
    main.appendChild(s5.section);

    // ============================================================
    // PROYECTO 6: Temporizador (Countdown Timer)
    // Cuenta regresiva desde minutos y segundos ingresados
    // ============================================================
    class timer {
        constructor() {
            this.min = document.createElement('input');
            this.min.placeholder = 'Minutos';
            this.min.type = 'number';
            this.min.min = '0';
            this.min.max = '60';
            
            this.sec = document.createElement('input');
            this.sec.placeholder = 'Segundos';
            this.sec.type = 'number';
            this.sec.min = '0';
            this.sec.max = '60';

            this.min.style.textAlign = 'center';
            this.sec.style.textAlign = 'center';

            this.ip = document.createElement('button');
            this.ip.textContent = 'Iniciar';

            this.i = false;  // Bandera de estado (iniciado/pausado)
            
            // Evento: iniciar o pausar el temporizador
            this.ip.addEventListener('click', () => {
                const time = setInterval(() => {
                    if (this.sec.value > 0 && this.i) {
                        this.sec.value -= 1;
                    } else if (this.min.value > 0 && this.i) {
                        this.min.value -= 1;
                        this.sec.value = 59;
                    } else {
                        clearInterval(time);
                        this.ip.textContent = 'Iniciar';
                        alert("¡Tiempo Terminado!");
                    }
                }, 1000);

                if (this.i) {
                    this.i = false;
                    this.ip.textContent = 'Iniciar';
                } else {
                    this.i = true;
                    this.ip.textContent = 'Pausar';
                }
            });
            
            // Botón Reset: reinicia a 0 minutos y 0 segundos
            this.r = document.createElement('button');
            this.r.textContent = 'Reset';
            this.r.addEventListener('click', () => {
                this.min.value = '0';
                this.sec.value = '0';
            });

            this.div = document.createElement('div');
            this.div.appendChild(this.min);
            this.div.appendChild(this.sec);
            this.div.appendChild(this.ip);
            this.div.appendChild(this.r);
        }
    }

    const a6 = new timer();
    const s6 = new section(a6.div, 'Proyecto 6: Temporizador (Countdown Timer)');
    main.appendChild(s6.section);

    // ============================================================
    // PROYECTO 7: Generador de Contraseñas
    // Genera contraseñas aleatorias con opciones de mayúsculas, números y símbolos
    // ============================================================
    class password {
        constructor() {
            // Conjuntos de caracteres disponibles
            this.c1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  // Mayúsculas
            this.c2 = "0123456789";                   // Números
            this.c3 = "!@#$%^&*()-_=+";                // Símbolos
            this.c4 = "abcdefghijklmnopqrstuvwxyz";  // Minúsculas
            
            this.b = document.createElement('button');
            this.b.textContent = 'Generar Contraseña';

            // Botones toggle para habilitar/inhabilitar mayúsculas
            this.b1 = document.createElement('button');
            this.b1.textContent = 'Mayúsculas Habilitadas';
            this.t1 = true;
            this.b1.addEventListener('click', () => {
                if (this.t1) {
                    this.t1 = false;
                    this.b1.textContent = 'Mayúsculas Inhabilitadas';
                } else {
                    this.t1 = true;
                    this.b1.textContent = 'Mayúsculas Habilitadas';
                }
            });

            // Botones toggle para habilitar/inhabilitar números
            this.b2 = document.createElement('button');
            this.b2.textContent = 'Números Habilitados';
            this.t2 = true;
            this.b2.addEventListener('click', () => {
                if (this.t2) {
                    this.t2 = false;
                    this.b2.textContent = 'Números Inhabilitados';
                } else {
                    this.t2 = true;
                    this.b2.textContent = 'Números Habilitados';
                }
            });

            // Botones toggle para habilitar/inhabilitar símbolos
            this.b3 = document.createElement('button');
            this.b3.textContent = 'Símbolos Habilitados';
            this.t3 = true;
            this.b3.addEventListener('click', () => {
                if (this.t3) {
                    this.t3 = false;
                    this.b3.textContent = 'Símbolos Inhabilitados';
                } else {
                    this.t3 = true;
                    this.b3.textContent = 'Símbolos Habilitados';
                }
            });

            // Control deslizante para elegir la longitud de la contraseña (6-20)
            this.i = document.createElement('input');
            this.i.type = 'range';
            this.i.placeholder = 'Número de caracteres';
            this.i.min = '6';
            this.i.max = '20';
            this.i.value = 12;

            // Mostrar la longitud seleccionada
            this.i.addEventListener('change', () => {
                this.pc.textContent = 'Cantidad de Caracteres de la Contraseña: ' + this.i.value;
            });

            this.pc = document.createElement('p');
            this.pc.textContent = 'Cantidad de Caracteres de la Contraseña: ' + this.i.value;

            this.p = document.createElement('p');
            this.p.style.textAlign = 'center';

            // Función para generar la contraseña
            this.b.addEventListener('click', () => {
                function abc(length = 6, caracteres) {
                    let password = "";
                    for (let i = 0; i < length; i++) {
                        const ir = Math.floor(Math.random() * caracteres.length);
                        password += caracteres.charAt(ir);
                    }
                    return password;
                }
                
                let caracteres = this.c4;  // Siempre incluye minúsculas
                if (this.t1) caracteres += this.c1;
                if (this.t2) caracteres += this.c2;
                if (this.t3) caracteres += this.c3;
                
                if (this.i.value !== '') {
                    this.p.textContent = abc(this.i.value, caracteres);
                }
            });

            // Botón para copiar la contraseña generada
            this.bb = document.createElement('button');
            this.bb.textContent = 'Copiar Contraseña';
            this.bb.addEventListener('click', () => {
                navigator.clipboard.writeText(this.p.textContent)
                    .then(() => {
                        alert('Texto copiado: ' + this.p.textContent);
                    })
                    .catch(err => {
                        console.error('Error al copiar: ', err);
                    });
            });

            // Ensamblar componente
            this.div = document.createElement('div');
            this.div.appendChild(this.p);
            this.div.appendChild(this.i);
            this.div.appendChild(this.pc);
            this.div.appendChild(this.b);
            this.div.appendChild(this.bb);
            this.div.appendChild(this.b1);
            this.div.appendChild(this.b2);
            this.div.appendChild(this.b3);
        }
    }

    const a7 = new password();
    const s7 = new section(a7.div, 'Proyecto 7: Generador de Contraseñas');
    main.appendChild(s7.section);

    // ============================================================
    // PROYECTO 8: Modo Oscuro / Claro
    // Cambia el tema de la página y guarda la preferencia en localStorage
    // ============================================================
    class light {
        constructor() {
            this.div = document.createElement('div');
            
            // Cargar tema guardado o usar claro por defecto
            this.w = localStorage.getItem('wb') !== null ? localStorage.getItem('wb') : `rgba(${255},${255},${255},${0.8})`;
            document.body.style.backgroundColor = this.w;
            
            // Ajustar color de fondo de los divs según el tema
            if (this.w === 'rgba(0,0,0,0.8)') {
                this.div.style.background = `rgb(${55}, ${71}, ${75})`;
            } else {
                this.div.style.background = `rgb(${171}, ${238}, ${255})`;
            }
            
            this.b = document.createElement('button');
            if (this.w === 'rgba(0,0,0,0.8)') {
                this.b.textContent = 'Modo Claro';
            } else {
                this.b.textContent = 'Modo Oscuro';
            }
            
            // Aplicar tema a todos los divs existentes
            const todosLosDivs = document.querySelectorAll("div");
            todosLosDivs.forEach(div => {
                if (this.w === 'rgba(0,0,0,0.8)') {
                    div.style.background = `rgb(${55}, ${71}, ${75})`;
                } else {
                    div.style.background = `rgb(${171}, ${238}, ${255})`;
                }
            });
            
            // Evento: alternar entre modo claro y oscuro
            this.b.addEventListener('click', () => {
                this.w = this.w === `rgba(${255},${255},${255},${0.8})` 
                        ? `rgba(${0},${0},${0},${0.8})` 
                        : `rgba(${255},${255},${255},${0.8})`;
                localStorage.setItem('wb', this.w);
                
                const todosLosDivs = document.querySelectorAll("div");
                todosLosDivs.forEach(div => {
                    if (this.w === 'rgba(0,0,0,0.8)') {
                        div.style.background = `rgb(${55}, ${71}, ${75})`;
                        this.b.textContent = 'Modo Claro';
                    } else {
                        div.style.background = `rgb(${171}, ${238}, ${255})`;
                        this.b.textContent = 'Modo Oscuro';
                    }
                });
                document.body.style.backgroundColor = this.w;
            });
            
            this.div.appendChild(this.b);
        }
    }

    const a8 = new light();
    const s8 = new section(a8.div, 'Proyecto 8: Modo Oscuro / Claro');
    main.appendChild(s8.section);

    // ============================================================
    // PROYECTO 9: Piedra, Papel o Tijera
    // Juego contra la CPU con marcador de victorias
    // ============================================================
    class ppt {
        constructor() {
            // Botones de las opciones del jugador
            this.b1 = document.createElement('button');
            this.b1.textContent = 'Piedra';
            this.b2 = document.createElement('button');
            this.b2.textContent = 'Papel';
            this.b3 = document.createElement('button');
            this.b3.textContent = 'Tijera';
            this.b4 = document.createElement('button');
            this.b4.textContent = 'Reiniciar Partida';

            this.p1 = document.createElement('p');
            this.p1.textContent = 'Elige una opción';
            this.p1.style.textAlign = 'center';

            this.p2 = document.createElement('p');
            this.p2.textContent = 'CPU';
            this.p2.style.textAlign = 'center';

            this.p3 = document.createElement('p');
            this.p3.textContent = 'Tu vs CPU';
            this.p3.style.textAlign = 'center';

            this.j = '';
            this.tu = 0;   // Puntuación del jugador
            this.cpu = 0;  // Puntuación de la CPU

            // Lógica del juego para cada opción
            this.b1.addEventListener('click', () => {
                const j = Math.floor(Math.random() * 3);
                if (j === 0) this.j = 'Piedra';
                else if (j === 1) this.j = 'Papel';
                else this.j = 'Tijera';

                if (this.j === 'Piedra') {
                    this.p2.textContent = `CPU ha jugado ${this.j}`;
                    this.p3.textContent = `Tu:${this.tu} | CPU: ${this.cpu}`;  // Empate
                } else if (this.j === 'Tijera') {
                    this.p2.textContent = `CPU ha jugado ${this.j}`;
                    this.p3.textContent = `Tu:${this.tu += 1} | CPU: ${this.cpu}`;  // Piedra gana a Tijera
                } else if (this.j === 'Papel') {
                    this.p2.textContent = `CPU ha jugado ${this.j}`;
                    this.p3.textContent = `Tu:${this.tu} | CPU: ${this.cpu += 1}`;  // Papel gana a Piedra
                }
                setTimeout(() => { this.p2.textContent = 'CPU'; }, 1000);
            });

            this.b2.addEventListener('click', () => {
                const j = Math.floor(Math.random() * 3);
                if (j === 0) this.j = 'Piedra';
                else if (j === 1) this.j = 'Papel';
                else this.j = 'Tijera';

                if (this.j === 'Piedra') {
                    this.p2.textContent = `CPU ha jugado ${this.j}`;
                    this.p3.textContent = `Tu:${this.tu += 1} | CPU: ${this.cpu}`;  // Papel gana a Piedra
                } else if (this.j === 'Tijera') {
                    this.p2.textContent = `CPU ha jugado ${this.j}`;
                    this.p3.textContent = `Tu:${this.tu} | CPU: ${this.cpu += 1}`;  // Tijera gana a Papel
                } else if (this.j === 'Papel') {
                    this.p2.textContent = `CPU ha jugado ${this.j}`;
                    this.p3.textContent = `Tu:${this.tu} | CPU: ${this.cpu}`;  // Empate
                }
                setTimeout(() => { this.p2.textContent = 'CPU'; }, 1000);
            });

            this.b3.addEventListener('click', () => {
                const j = Math.floor(Math.random() * 3);
                if (j === 0) this.j = 'Piedra';
                else if (j === 1) this.j = 'Papel';
                else this.j = 'Tijera';

                if (this.j === 'Piedra') {
                    this.p2.textContent = `CPU ha jugado ${this.j}`;
                    this.p3.textContent = `Tu:${this.tu} | CPU: ${this.cpu += 1}`;  // Piedra gana a Tijera
                } else if (this.j === 'Tijera') {
                    this.p2.textContent = `CPU ha jugado ${this.j}`;
                    this.p3.textContent = `Tu:${this.tu} | CPU: ${this.cpu}`;  // Empate
                } else if (this.j === 'Papel') {
                    this.p2.textContent = `CPU ha jugado ${this.j}`;
                    this.p3.textContent = `Tu:${this.tu += 1} | CPU: ${this.cpu}`;  // Tijera gana a Papel
                }
                setTimeout(() => { this.p2.textContent = 'CPU'; }, 1000);
            });

            // Reiniciar el marcador
            this.b4.addEventListener('click', () => {
                this.tu = 0;
                this.cpu = 0;
                this.p3.textContent = `Tu:${this.tu} | CPU: ${this.cpu}`;
            });

            // Ensamblar componente
            this.div = document.createElement('div');
            this.s = document.createElement('section');
            this.s.appendChild(this.b1);
            this.s.appendChild(this.b2);
            this.s.appendChild(this.b3);
            this.div.appendChild(this.p1);
            this.div.appendChild(this.s);
            this.div.appendChild(this.p2);
            this.div.appendChild(this.p3);
            this.div.appendChild(this.b4);
        }
    }

    const a9 = new ppt();
    const s9 = new section(a9.div, 'Proyecto 9: Piedra, Papel o Tijera');
    main.appendChild(s9.section);

    // ============================================================
    // PROYECTO 10: Galería de Imágenes con Filtros
    // Muestra imágenes clasificadas por categorías (Animales, Tecnología, Naturaleza)
    // Al hacer clic en una imagen, se abre un modal con información ampliada
    // ============================================================
    class images {
        constructor() {
            // Crear 12 imágenes con sus respectivas URLs
            this.i1 = document.createElement('img');
            this.i2 = document.createElement('img');
            this.i3 = document.createElement('img');
            this.i4 = document.createElement('img');
            this.i5 = document.createElement('img');
            this.i6 = document.createElement('img');
            this.i7 = document.createElement('img');
            this.i8 = document.createElement('img');
            this.i9 = document.createElement('img');
            this.i10 = document.createElement('img');
            this.i11 = document.createElement('img');
            this.i12 = document.createElement('img');

            // Asignar URLs de imágenes (Taiga, Tardigrado, Dunkleosteus, etc.)
            this.i1.src = 'https://mf.b37mrtl.ru/rbthmedia/images/2019.10/original/5d9b13ab85600a46ae155863.jpg';  // taiga
            this.i2.src = 'https://allyouneedisbiology.wordpress.com/wp-content/uploads/2015/09/tardigrade-e1443382010464.jpg?w=1024&h=576&crop=1';  // tardigrado
            // dunkleosteus
            this.i3.src = 'data:image/jpeg;base64,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';
            // dragon azul
            this.i4.src = 'data:image/jpeg;base64,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';
            //miel
            this.i5.src = 'data:image/jpeg;base64,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';
            this.i6.src = 'https://images.squarespace-cdn.com/content/v1/656f4639c770ec629203bdbe/8dfbb04b-5d2e-469d-aa79-04dc99a5f6cf/alan-turing-and-turing-machine.jpg';  // Turing
            this.i7.src = 'https://betawiki.net/images/a/af/Arch_Linux_neofetch.png';  // Arch Linux
            this.i8.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Motorola_6800_Assembly_Language.png';  // Assembly
            this.i9.src = 'https://i.blogs.es/b5cfc9/b-2-spirit-stealth-bomber_110816pmar490029/650_1200.jpeg';  // B-2
            this.i10.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREjuOMeKO86CKVaEioNOCzqD5yQ937RZ95BQ&s';  // oso
            this.i11.src = 'https://as01.epimg.net/epik/imagenes/2017/11/13/portada/1510586807_350031_1510586958_noticia_normal.jpg';  // gato
            this.i12.src = 'https://i.pinimg.com/236x/9a/2c/f0/9a2cf01984222a35e80a336da77c9eec.jpg';  // kangal

            // Establecer dimensiones uniformes para todas las imágenes
            this.i1.width = 200; this.i1.height = 200;
            this.i2.width = 200; this.i2.height = 200;
            this.i3.width = 200; this.i3.height = 200;
            this.i4.width = 200; this.i4.height = 200;
            this.i5.width = 200; this.i5.height = 200;
            this.i6.width = 200; this.i6.height = 200;
            this.i7.width = 200; this.i7.height = 200;
            this.i8.width = 200; this.i8.height = 200;
            this.i9.width = 200; this.i9.height = 200;
            this.i10.width = 200; this.i10.height = 200;
            this.i11.width = 200; this.i11.height = 200;
            this.i12.width = 200; this.i12.height = 200;
            
            // Agrupar imágenes en secciones (filas de 3)
            this.s1 = document.createElement('section');
            this.s2 = document.createElement('section');
            this.s3 = document.createElement('section');
            this.s4 = document.createElement('section');

            this.s1.appendChild(this.i1);
            this.s1.appendChild(this.i2);
            this.s1.appendChild(this.i3);
            this.s2.appendChild(this.i4);
            this.s2.appendChild(this.i5);
            this.s2.appendChild(this.i6);
            this.s3.appendChild(this.i7);
            this.s3.appendChild(this.i8);
            this.s3.appendChild(this.i9);
            this.s4.appendChild(this.i10);
            this.s4.appendChild(this.i11);
            this.s4.appendChild(this.i12);

            // Botón para mostrar todas las imágenes
            this.b1 = document.createElement('button');
            this.b1.textContent = 'Todas';
            this.b1.addEventListener('click', () => {
                const imagenes = [this.i1, this.i2, this.i3, this.i4, this.i5, this.i6, 
                                  this.i7, this.i8, this.i9, this.i10, this.i11, this.i12];
                imagenes.forEach(img => img.style.visibility = 'visible');
            });

            // Botón para filtrar solo imágenes de animales
            this.b2 = document.createElement('button');
            this.b2.textContent = 'Animales';
            this.b2.addEventListener('click', () => {
                this.i1.style.visibility = 'hidden';
                this.i2.style.visibility = 'hidden';
                this.i3.style.visibility = 'visible';   // dunkleosteus
                this.i4.style.visibility = 'visible';   // dragón azul
                this.i5.style.visibility = 'hidden';
                this.i6.style.visibility = 'hidden';
                this.i7.style.visibility = 'hidden';
                this.i8.style.visibility = 'hidden';
                this.i9.style.visibility = 'hidden';
                this.i10.style.visibility = 'visible';  // oso
                this.i11.style.visibility = 'hidden';
                this.i12.style.visibility = 'visible';  // kangal
            });

            // Botón para filtrar solo imágenes de tecnología
            this.b3 = document.createElement('button');
            this.b3.textContent = 'Tecnología';
            this.b3.addEventListener('click', () => {
                this.i1.style.visibility = 'hidden';
                this.i2.style.visibility = 'hidden';
                this.i3.style.visibility = 'hidden';
                this.i4.style.visibility = 'hidden';
                this.i5.style.visibility = 'hidden';
                this.i6.style.visibility = 'visible';  // Turing
                this.i7.style.visibility = 'visible';  // Arch Linux
                this.i8.style.visibility = 'visible';  // Assembly
                this.i9.style.visibility = 'visible';  // B-2
                this.i10.style.visibility = 'hidden';
                this.i11.style.visibility = 'hidden';
                this.i12.style.visibility = 'hidden';
            });

            // Botón para filtrar solo imágenes de naturaleza
            this.b4 = document.createElement('button');
            this.b4.textContent = 'Naturaleza';
            this.b4.addEventListener('click', () => {
                this.i1.style.visibility = 'visible';   // taiga
                this.i2.style.visibility = 'visible';   // tardigrado
                this.i3.style.visibility = 'hidden';
                this.i4.style.visibility = 'hidden';
                this.i5.style.visibility = 'visible';   // miel
                this.i6.style.visibility = 'hidden';
                this.i7.style.visibility = 'hidden';
                this.i8.style.visibility = 'hidden';
                this.i9.style.visibility = 'hidden';
                this.i10.style.visibility = 'hidden';
                this.i11.style.visibility = 'visible';  // gato
                this.i12.style.visibility = 'hidden';
            });

            // Campo de texto para filtro por palabra clave
            this.i = document.createElement('input');
            this.i.type = 'text';
            this.i.placeholder = 'Escribe alguna categoría';

            // Filtro dinámico según lo que escribe el usuario
            this.i.addEventListener('input', () => {
                const valor = this.i.value.toLowerCase();
                if (valor === 'naturaleza' || valor === 'habitad' || valor === 'medio ambiente' || 
                    valor === 'ecosistema' || valor === 'entorno') {
                    this.b4.click();  // Reutilizar filtro de naturaleza
                } else if (valor === 'animales' || valor === 'bestias' || valor === 'criaturas' || 
                           valor === 'fauna' || valor === 'seres vivos') {
                    this.b2.click();  // Reutilizar filtro de animales
                } else if (valor === 'tecnologia' || valor === 'ingenieria' || valor === 'mecanizacion' || 
                           valor === 'innovacion' || valor === 'tecnica') {
                    this.b3.click();  // Reutilizar filtro de tecnología
                } else {
                    this.b1.click();  // Mostrar todas
                }
            });

            // Diálogo modal para mostrar imagen en grande
            this.d = document.createElement('dialog');
            
            this.b5 = document.createElement('button');
            this.b5.textContent = 'Minimizar imagen';
            this.b5.addEventListener('click', () => {
                this.d.close();
            });

            this.ii = document.createElement('img');
            this.ii.width = 500;
            this.ii.height = 500;
            this.pp = document.createElement('p');  // Título de la imagen

            this.d.appendChild(this.pp);
            this.d.appendChild(this.ii);
            this.d.appendChild(this.b5);
            document.body.appendChild(this.d);

            // Eventos de clic en cada imagen: mostrar ampliada
            this.i1.addEventListener('click', () => { this.ii.src = this.i1.src; this.pp.textContent = 'La Taiga Siberiana'; this.d.showModal(); });
            this.i2.addEventListener('click', () => { this.ii.src = this.i2.src; this.pp.textContent = 'El Tardigrado'; this.d.showModal(); });
            this.i3.addEventListener('click', () => { this.ii.src = this.i3.src; this.pp.textContent = 'El Dunkleosteus'; this.d.showModal(); });
            this.i4.addEventListener('click', () => { this.ii.src = this.i4.src; this.pp.textContent = 'Dragón Azul'; this.d.showModal(); });
            this.i5.addEventListener('click', () => { this.ii.src = this.i5.src; this.pp.textContent = 'Miel de Abeja'; this.d.showModal(); });
            this.i6.addEventListener('click', () => { this.ii.src = this.i6.src; this.pp.textContent = 'La Máquina de Turing'; this.d.showModal(); });
            this.i7.addEventListener('click', () => { this.ii.src = this.i7.src; this.pp.textContent = 'Linux Arch'; this.d.showModal(); });
            this.i8.addEventListener('click', () => { this.ii.src = this.i8.src; this.pp.textContent = 'Lenguaje Ensamblador'; this.d.showModal(); });
            this.i9.addEventListener('click', () => { this.ii.src = this.i9.src; this.pp.textContent = 'Bombardero B-2 Spirit'; this.d.showModal(); });
            this.i10.addEventListener('click', () => { this.ii.src = this.i10.src; this.pp.textContent = 'Oso Grizzly'; this.d.showModal(); });
            this.i11.addEventListener('click', () => { this.ii.src = this.i11.src; this.pp.textContent = 'Gato Quimera'; this.d.showModal(); });
            this.i12.addEventListener('click', () => { this.ii.src = this.i12.src; this.pp.textContent = 'El Kangal Turco'; this.d.showModal(); });

            // Ensamblar galería completa
            this.div = document.createElement('div');
            this.div.appendChild(this.i);  // Input de filtro
            this.div.appendChild(this.s1);
            this.div.appendChild(this.s2);
            this.div.appendChild(this.s3);
            this.div.appendChild(this.s4);
            this.div.appendChild(this.b1);
            this.div.appendChild(this.b2);
            this.div.appendChild(this.b3);
            this.div.appendChild(this.b4);
        }
    }

    const a10 = new images();
    const s10 = new section(a10.div, 'Proyecto 10: Galería de Imágenes con Filtros');
    main.appendChild(s10.section);

    // ============================================================
    // PIE DE PÁGINA
    // ============================================================
    const f = document.createElement('footer');
    f.textContent = 'Juan Diego Valero 2026 Github: https://github.com/juandv12607-commits/Mis-10-Proyectos-de-JS-Juan-Valero';
    main.appendChild(f);
