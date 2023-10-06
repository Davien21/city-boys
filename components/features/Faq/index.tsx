import { Accordion } from "components/common/Accordion";
import React, { useState } from "react";
import { getRandomKey } from "utils/randomKey";

interface IQuestion {
  question: string;
  answer: string;
}

export function Faq({ data }: { data: IQuestion[] }) {
  return (
    <div className="flex flex-col gap-3">
      {data.map((item, index) => {
        const isDefaultOpen = index === 0;
        return (
          <Accordion
            key={getRandomKey()}
            isDefaultOpen={isDefaultOpen}
            header={item.question}
          >
            {item.answer}
          </Accordion>
        );
      })}
    </div>
  );
}
