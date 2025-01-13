const diagnosticsData = {
    notStarting: {
        question: "Есть питание в розетке?",
        answers: {
            yes: {
                question: "Включатель в положении включено??",
                answers: {
                    yes: {
                        question: "Есть ли индикаторные огни?",
                        answers: {
                            yes: "Машинка работает.",
                            no: "Обратитесь в сервисный центр."
                        }
                    },
                    no: "Переведите включатель в режим включено."
                }
            },
            no: "Проверить розетку или кабель питания."
        }
    },
    noCoffee: {
        question: "Есть ли вода в резервуаре?",
        answers: {
            yes: {
                question: "Проверили фильтр?",
                answers: {
                    yes: {
                        question: "Насос работает?",
                        answers: {
                            yes: "Обратиться в сервисный центр.",
                            no: "Заменить насос."
                        }
                    },
                    no: "Очистить или заменить фильтр."
                }
            },
            no: "Добавить воду в резервуар."
        }
    },
    noises: {
        question: "Шумит кофемолка?",
        answers: {            
            yes: "Очистить кофемолку от остатков.",
            no: {
                question: "Посторонние звуки в насосе?",
                answers: {
                    yes: "Заменить насос.",
                    no: {
                        question: "Шумят соединения?",
                        answers: {
                            yes: "Подтянуть соединения.",
                            no: "Обратиться в сервисный центр."
                        }
                    }
                }
            }
        }
    },
    leaks: {
        question: "Проверили уплотнители?",
        answers: {
            yes: {
                question: "Есть ли повреждения уплотнителей?",
                answers: {
                    yes: "Заменить уплотнители.",
                    no: {
                        question: "Проверили соединения шлангов?",
                        answers: {
                            yes: "Подтянуть или заменить соединения.",
                            no: "Обратиться в сервисный центр."
                        }
                    }
                }
            },
            no: "Проверить корпус на трещины."
        }
    }
};

let currentDiagnosis = null;

function startDiagnosis(issue) {
    currentDiagnosis = diagnosticsData[issue];
    document.getElementById("diagnostics-tree").classList.remove("hidden");
    navigateDiagnosis(currentDiagnosis);
}

function navigateDiagnosis(node) {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");

    questionElement.textContent = node.question;
    answersElement.innerHTML = "";

    if (node.answers) {
        Object.keys(node.answers).forEach(answer => {
            const button = document.createElement("button");
            button.textContent = answer === "yes" ? "Да" : "Нет";
            button.onclick = () => {
                const nextNode = node.answers[answer];
                if (typeof nextNode === "string") {
                    questionElement.textContent = nextNode;
                    answersElement.innerHTML = "";
                } else {
                    navigateDiagnosis(nextNode);
                }
            };
            answersElement.appendChild(button);
        });
    }
}