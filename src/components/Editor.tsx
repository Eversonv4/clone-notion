import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import js from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";
import { lowlight } from "lowlight/lib/core";
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxChevronDown,
  RxChatBubble,
} from "react-icons/rx";

import { InitialContent } from "./initialContent";
import { BubbleButton } from "./BubbleButton";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    // onUpdate(editor) {
    //   // editor.editor.getHTML()
    // },
    content: InitialContent,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  return (
    <>
      <EditorContent
        editor={editor}
        className="max-w-[700px] max-auto pt-16 prose prose-invert prose-emerald"
      />

      {/* Isso aqui é um menu que abre quando iniciamos uma nova linha e apertamos "/", tipo no notion */}
      {editor && (
        <FloatingMenu
          className="bg-zinc-700 py-2 px-1 shadow-xl border gap-1 border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col"
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;
            const currentLineText = $from.nodeBefore?.textContent;

            return currentLineText === "/";
          }}
        >
          <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600">
            <img
              src="http://www.notion.so/images/blocks/text/en-US.png"
              alt="text"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Text</span>
              <span className="text-xm text-zinc-400">
                Just start writing with plain text.
              </span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <img
              src="http://www.notion.so/images/blocks/header.57a7576a.png"
              alt="Heading"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Heading 1</span>
              <span className="text-xm text-zinc-400">
                Big section heading.
              </span>
            </div>
          </button>
        </FloatingMenu>
      )}

      {/* Isso aqui abaixo são os botõeszinhos que aparecem quando selecionamos um texto */}
      {editor && (
        <BubbleMenu
          editor={editor}
          className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600"
        >
          <BubbleButton>
            Text
            <RxChevronDown className="h-4 w-4" />
          </BubbleButton>

          <BubbleButton>
            Comment
            <RxChatBubble className="h-4 w-4" />
          </BubbleButton>

          <div className="flex items-center">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive("bold")}
            >
              <RxFontBold className="h-4 w-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive("italic")}
            >
              <RxFontItalic className="h-4 w-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive("strike")}
            >
              <RxStrikethrough className="h-4 w-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              data-active={editor.isActive("code")}
            >
              <RxCode className="h-4 w-4" />
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
    </>
  );
}
