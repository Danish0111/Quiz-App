import React from 'react'
import { useState, useEffect } from 'react'

const useFetchQuiz = () => {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const API_URL = "https://api.allorigins.win/get?url=https://api.jsonserve.com/Uw5CrX"

    async function fetchData() {
        try {
            let x = await fetch(API_URL)
            let data = await x.json()
            let quizData = JSON.parse(data.contents)
            console.log(quizData)
            return quizData
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }

    async function processData() {
        const quizData = await fetchData()

        if (quizData) {
            const questionList = quizData.questions.map(question => {
                return {
                    questionId: question.id,
                    questionText: question.description,
                    options: question.options.map(option => ({
                        optionId: option.id,
                        text: option.description,
                        isCorrect: option.is_correct
                    }))
                }
            })
            console.log(questionList)
            setQuestions(questionList)
            setLoading(false)
        }
    }

    useEffect(() => {
      processData()
    }, [])
    
    return { questions, loading, error };
}

export default useFetchQuiz