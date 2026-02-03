const questions = [
            {
                question: "Que signifie un panneau rond avec un bord rouge ?",
                options: [
                    "Une indication",
                    "Une interdiction ou obligation",
                    "Un danger",
                    "Une direction"
                ],
                correct: 1,
                lesson: "Les Panneaux de Signalisation"
            },
            {
                question: "Quelle est la règle de priorité aux ronds-points ?",
                options: [
                    "Priorité à droite",
                    "Priorité à gauche",
                    "Les véhicules à l'intérieur ont la priorité",
                    "Pas de règle spécifique"
                ],
                correct: 2,
                lesson: "Les Priorités de Passage"
            },
            {
                question: "Quelle est la vitesse maximale en ville ?",
                options: [
                    "30 km/h",
                    "50 km/h",
                    "70 km/h",
                    "90 km/h"
                ],
                correct: 1,
                lesson: "Les Limitations de Vitesse"
            },
            {
                question: "Quelle est la règle pour la distance de sécurité ?",
                options: [
                    "1 seconde entre les véhicules",
                    "2 secondes entre les véhicules",
                    "3 secondes entre les véhicules",
                    "Pas de règle précise"
                ],
                correct: 1,
                lesson: "La Distance de Sécurité"
            },
            {
                question: "Que faire lorsque le feu passe à l'orange ?",
                options: [
                    "Accélérer pour passer",
                    "S'arrêter si on peut le faire en sécurité",
                    "Continuer sans ralentir",
                    "Klaxonner"
                ],
                correct: 1,
                lesson: "Les Feux de Signalisation"
            },
            {
                question: "Que signifie un panneau triangulaire ?",
                options: [
                    "Une obligation",
                    "Une interdiction",
                    "Un danger",
                    "Une indication"
                ],
                correct: 2,
                lesson: "Les Panneaux de Signalisation"
            },
            {
                question: "Quelle est la vitesse sur autoroute par temps de pluie ?",
                options: [
                    "130 km/h",
                    "120 km/h",
                    "110 km/h",
                    "100 km/h"
                ],
                correct: 2,
                lesson: "Les Limitations de Vitesse"
            },
            {
                question: "Aux intersections sans signalisation, quelle règle s'applique ?",
                options: [
                    "Priorité à gauche",
                    "Priorité à droite",
                    "Pas de priorité",
                    "Le plus rapide passe"
                ],
                correct: 1,
                lesson: "Les Priorités de Passage"
            }
        ];

       
        let currentQuestion = 0;
        let score = 0;
        let userAnswers = [];

        
        function showHome() {
            document.getElementById('homeView').classList.remove('hidden');
            document.getElementById('learnView').classList.add('hidden');
            document.getElementById('quizView').classList.add('hidden');
            document.getElementById('resultsView').classList.add('hidden');
            document.getElementById('progressContainer').classList.add('hidden');
        }

        function showLearning() {
            document.getElementById('homeView').classList.add('hidden');
            document.getElementById('learnView').classList.remove('hidden');
            document.getElementById('quizView').classList.add('hidden');
            document.getElementById('resultsView').classList.add('hidden');
            document.getElementById('progressContainer').classList.add('hidden');
        }

        
        function startQuiz() {
            currentQuestion = 0;
            score = 0;
            userAnswers = [];
            
            document.getElementById('homeView').classList.add('hidden');
            document.getElementById('learnView').classList.add('hidden');
            document.getElementById('quizView').classList.remove('hidden');
            document.getElementById('resultsView').classList.add('hidden');
            document.getElementById('progressContainer').classList.remove('hidden');
            
            showQuestion();
        }

        function showQuestion() {
            const question = questions[currentQuestion];
            const progress = ((currentQuestion) / questions.length) * 100;
            
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('questionCounter').textContent = `Question ${currentQuestion + 1} / ${questions.length}`;
            document.getElementById('questionText').textContent = question.question;
            document.getElementById('feedbackContainer').innerHTML = '';
            document.getElementById('nextButton').style.display = 'none';
            
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.textContent = option;
                optionDiv.onclick = () => selectAnswer(index);
                optionsContainer.appendChild(optionDiv);
            });
        }

        function selectAnswer(selectedIndex) {
            const question = questions[currentQuestion];
            const options = document.querySelectorAll('.option');
            
            
            options.forEach(opt => {
                opt.classList.add('disabled');
                opt.onclick = null;
            });
            
            
            options[selectedIndex].classList.add('selected');
            
            
            userAnswers.push({
                question: question.question,
                userAnswer: selectedIndex,
                correctAnswer: question.correct,
                userAnswerText: question.options[selectedIndex],
                correctAnswerText: question.options[question.correct],
                lesson: question.lesson
            });
            
           
            const feedbackContainer = document.getElementById('feedbackContainer');
            
            if (selectedIndex === question.correct) {
                score++;
                options[selectedIndex].classList.add('correct');
                feedbackContainer.innerHTML = `
                    <div class="feedback-message correct">
                        ✓ Excellente réponse ! Vous avez bien compris cette règle.
                    </div>
                `;
            } else {
                options[selectedIndex].classList.add('incorrect');
                options[question.correct].classList.add('correct');
                feedbackContainer.innerHTML = `
                    <div class="feedback-message incorrect">
                        ✗ Dommage ! La bonne réponse était : "${question.options[question.correct]}"
                    </div>
                `;
            }
            
            
            document.getElementById('nextButton').style.display = 'inline-block';
        }

        function nextQuestion() {
            currentQuestion++;
            
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            const percentage = Math.round((score / questions.length) * 100);
            const passed = percentage >= 75;
            
            document.getElementById('quizView').classList.add('hidden');
            document.getElementById('resultsView').classList.remove('hidden');
            document.getElementById('progressContainer').classList.add('hidden');
            
            document.getElementById('scoreDisplay').textContent = score + ' / ' + questions.length;
            document.getElementById('correctCount').textContent = score;
            document.getElementById('incorrectCount').textContent = questions.length - score;
            document.getElementById('percentageScore').textContent = percentage + '%';
            
            const resultMessage = document.getElementById('resultMessage');
            if (passed) {
                resultMessage.textContent = '🎉 Félicitations ! Vous avez réussi le test !';
                resultMessage.className = 'result-message pass';
            } else {
                resultMessage.textContent = '📚 Vous devez réviser. Consultez vos erreurs ci-dessous.';
                resultMessage.className = 'result-message fail';
                showReview();
            }
        }

        function showReview() {
            const wrongAnswers = userAnswers.filter(answer => answer.userAnswer !== answer.correctAnswer);
            
            if (wrongAnswers.length === 0) return;
            
            const reviewSection = document.getElementById('reviewSection');
            reviewSection.classList.remove('hidden');
            
            let reviewHTML = '<h3 class="review-title">📋 Vos erreurs à réviser</h3>';
            
            wrongAnswers.forEach((answer, index) => {
                reviewHTML += `
                    <div class="wrong-question-card">
                        <div class="wrong-question-title">Question ${userAnswers.indexOf(answer) + 1}</div>
                        <div class="wrong-question-text">${answer.question}</div>
                        <div class="your-answer">
                            <strong>Votre réponse :</strong> ${answer.userAnswerText}
                        </div>
                        <div class="correct-answer">
                            <strong>Bonne réponse :</strong> ${answer.correctAnswerText}
                        </div>
                        <div class="lesson-suggestion">
                            <div class="lesson-suggestion-title">📚 Leçon à réviser :</div>
                            <div class="lesson-suggestion-text">${answer.lesson}</div>
                        </div>
                    </div>
                `;
            });
            
           
            const lessonsToReview = [...new Set(wrongAnswers.map(a => a.lesson))];
            reviewHTML += `
                <div class="lessons-to-review">
                    <div class="lessons-to-review-title">📚 Résumé des leçons à réviser</div>
                    <ul class="lessons-list">
                        ${lessonsToReview.map(lesson => `<li>${lesson}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            reviewSection.innerHTML = reviewHTML;
        }
