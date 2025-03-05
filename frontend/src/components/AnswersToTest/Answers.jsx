import { useEffect, useState } from "react";
import { ExpandingTitle } from "./ExpandingTitle";
import axios from "axios";
import { API_URL } from "../../config";

export default function Answers() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`${API_URL}/topics/`);
        setAnswers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAnswers();
  }, []);

  return (
    <div className="content">
      <h2>Ответы на тест для неквалифицированного инвестора</h2>
      <div>
        Центральный Банк России с первого октября 2021 года ввёл обязательное
        прохождение тестирования для неквалифицированных инвесторов, которые
        хотят получить доступ к высокорисковым инструментам и операциям. Ниже вы
        сможете получить все ответы на тест для неквалифицированных инвесторов.
      </div>
      {answers.map((answer) => (
        <ExpandingTitle {...answer} key={answer.id} />
      ))}
      <div>
        Вот ответы неквалифицированных инвесторов должны быть правильными для
        получения статуса.
      </div>
      <h2>Вопросы и ответы по самому тесту</h2>
      <p>
        <strong>Сколько попыток?</strong>
      </p>
      <p>
        Бесконечно. Однако некоторые разрешают пересдать тест сразу, а некоторые
        – через сутки.
      </p>
      <p>
        <strong>Есть ли вопросы с несколькими ответами?</strong>
      </p>
      <p>Нет, каждый вопрос имеет только один ответ.</p>
      <p>
        <strong>Можно ли переносить тест от брокера к брокеру?</strong>
      </p>
      <p>
        Нет, нужно сдавать у каждого брокера, у которого вы хотите совершать
        сделки.
      </p>
      <p>
        <strong>Как отвечать на вопрос блока “Самооценка”?</strong>
      </p>
      <p>
        Как угодно, они ни на что не влияют, но ваши ответы должны сохраняться
        брокером. Желательно ответить честно.
      </p>
    </div>
  );
}
