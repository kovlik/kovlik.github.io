const diagnosticsData = {
    notStarting: {
        question: "Проверено ли наличие напряжения в розетке?",
        answers: {
            yes: {
                question: "Ручной переключатель находится в положении «Включено»?",
                answers: {
                    yes: {
                        question: "Присутствует ли индикация на устройстве?",
                        answers: {
                            yes: {
                                question: "Реагирует ли кофемашина на нажатие кнопок?",
                                answers: {
                                    yes: "Обратиться в сервисный центр для замены индикаторов на устройстве.",
                                    no: "Рекомендуется обратиться в сервисный центр."
                        }
                            },
                            no: "Рекомендуется обратиться в сервисный центр."
                        }
                    },
                    no: {
                        question: "Переведите переключатель в положение «Включено». Помогло ли это решить проблему?",
                        answers: {
                            yes: "Рад, что удалось помочь!",
                            no: "Рекомендуется обратиться в сервисный центр."
                        }
                    }
                }
            },
            no: {
                question: "Проверьте работоспособность розетки или целостность кабеля питания. Помогло ли это решить проблему?",
                answers: {
                    yes: "Рад, что удалось помочь!",
                    no: "Рекомендуется обратиться в сервисный центр."
                }
            }
        }
    },
    noCoffee: {
        question: "Есть ли вода в резервуаре?",
        answers: {
            yes: {
                question: "Проверен ли фильтр для воды?",
                answers: {
                    yes: {
                        question: "Работает ли насос подачи воды?",
                        answers: {
                            yes: "Рекомендуется обратиться в сервисный центр.",
                            no: {
                                question: "Замените насос подачи воды. Помогло ли это решить проблему?",
                                answers: {
                                    yes: "Рад, что удалось помочь!",
                                    no: "Рекомендуется обратиться в сервисный центр."
                                }
                            }
                        }
                    },
                    no: {
                        question: "Очистите или замените фильтр для воды. Помогло ли это решить проблему?",
                        answers: {
                            yes: "Рад, что удалось помочь!",
                            no: "Рекомендуется обратиться в сервисный центр."
                        }
                    }
                }
            },
            no: {
                question: "Добавьте воду в резервуар. Помогло ли это решить проблему?",
                answers: {
                    yes: "Рад, что удалось помочь!",
                    no: "Рекомендуется обратиться в сервисный центр."
                }
            }
        }
    },
    noises: {
        question: "Имеюся ли отстатки кофейных зёрен в фильтре?",
        answers: {
            yes: {
                question: "Очистите фильтр. Помогло ли это решить проблему?",
                        answers: {
                            yes: "Рад, что удалось помочь!",
                            no: "Рекомендуется обратиться в сервисный центр."
                        }
            },
            no: {
                question: "Слышны посторонние звуки от работы насоса?",
                answers: {
                    yes: {
                        question: "Замените насос. Помогло ли это решить проблему?",
                        answers: {
                            yes: "Рад, что удалось помочь!",
                            no: "Рекомендуется обратиться в сервисный центр."
                        }
                    },
                    no: {
                        question: "Проверьте, шумят ли соединения трубок или шлангов.",
                        answers: {
                            yes: {
                                question: "Подтяните соединения. Помогло ли это решить проблему?",
                                answers: {
                                    yes: "Рад, что удалось помочь!",
                                    no: "Рекомендуется обратиться в сервисный центр."
                                }
                            },
                            no: "Рекомендуется обратиться в сервисный центр."
                        }
                    }
                }
            }
        }
    },    
    leaks: {
        question: "Проверены ли уплотнительные элементы?",
        answers: {
            yes: {
                question: "Имеются трещины на корпусе устройства?",
                answers: {
                    yes: "Обратитесь в сервисный сервис для замены поврежденного корпуса.",
                    no: "Рекомендуется обратиться в сервисный центр."
                }
            },
            no: {
                question: "Имеются ли повреждения на уплотнительных элементах?",
                answers: {
                    yes: {
                        question: "Замените повреждённые уплотнительные элементы. Помогло ли это решить проблему?",
                        answers: {
                            yes: "Рад, что удалось помочь!",
                            no: "Рекомендуется обратиться в сервисный центр."
                        }
                    },
                    no: {
                        question: "Соединения шлангов проверены?",
                        answers: {
                            yes: "Рекомендуется обратиться в сервисный центр.",
                            no: {
                                question: "Подтяните или замените соединения шлангов. Помогло ли это решить проблему?",
                                answers: {
                                    yes: "Рад, что удалось помочь!",
                                    no: "Рекомендуется обратиться в сервисный центр."
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

let currentDiagnosis = null;

function startDiagnosis(issue, sectionId) {
    currentDiagnosis = diagnosticsData[issue];
    document.querySelectorAll(".diagnostics-section").forEach(section => {
        section.style.display = "none";
    });
    const section = document.getElementById(sectionId);
    section.style.display = "block";
    displayQuestion(currentDiagnosis, section);
}

function displayQuestion(node, section) {
    section.innerHTML = ""; // Очистить предыдущий вывод

    const questionText = document.createElement("p");
    questionText.textContent = node.question;
    section.appendChild(questionText);

    if (node.answers) {
        Object.keys(node.answers).forEach(answerKey => {
            const button = document.createElement("button");
            button.textContent = answerKey === "yes" ? "Да" : "Нет";
            button.style.marginRight = "20px"; // Расстояние между кнопками
            button.style.width = "150px"; // Ширина кнопок
            button.onclick = () => {
                const nextNode = node.answers[answerKey];
                if (typeof nextNode === "string") {
                    displayFinalMessage(nextNode, section);
                } else {
                    displayQuestion(nextNode, section);
                }
            };
            section.appendChild(button);
        });
    }
}

function displayFinalMessage(message, section) {
    section.innerHTML = ""; // Очистить предыдущий вывод

    const finalMessage = document.createElement("p");
    finalMessage.textContent = message;
    section.appendChild(finalMessage);
}
