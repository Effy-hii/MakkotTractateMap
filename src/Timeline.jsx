import React, { useState } from "react";

function Tooltip({ children, text }) {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
        {text}
      </div>
    </div>
  );
}

function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-right p-2 font-semibold bg-gray-100 hover:bg-gray-200"
      >
        {title} {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && <div className="p-2">{children}</div>}
    </div>
  );
}

function Modal({ isOpen, onClose, title, pages, text }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-right">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm mb-2 text-gray-600">דפים: {pages}</p>
        <p className="text-sm mb-4">
          {text && text.trim() !== "" ? text : "no text"}
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          סגור
        </button>
      </div>
    </div>
  );
}

export default function Timeline({ data }) {
  const [modal, setModal] = useState({ open: false, sub: null });

  return (
    <div className="overflow-x-auto text-right" dir="rtl">
      {data.map((chapter, cIdx) => (
        <Collapsible key={cIdx} title={chapter.chapter}>
          {chapter.topics.map((topic, tIdx) => (
            <Collapsible key={tIdx} title={topic.mainTopic}>
              <div className="flex items-center space-x-6 space-x-reverse border-t pt-4">
                {topic.subTopics.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setModal({ open: true, sub })}
                  >
                    <Tooltip text={`דפים: ${sub.pages}`}>
                      <div
                        className={`w-4 h-4 rounded-full ${
                          sub.type === "halachic"
                            ? "bg-blue-500"
                            : sub.type === "story"
                            ? "bg-green-500"
                            : sub.type === "other_halachic"
                            ? "bg-yellow-500"
                            : "bg-purple-500"
                        }`}
                      />
                    </Tooltip>
                    <span className="text-xs mt-1 font-medium">
                      {sub.title}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {sub.pages}
                    </span>
                  </div>
                ))}
              </div>
            </Collapsible>
          ))}
        </Collapsible>
      ))}

      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, sub: null })}
        title={modal.sub?.title}
        pages={modal.sub?.pages}
        text={modal.sub?.text}
      />
    </div>
  );
}

