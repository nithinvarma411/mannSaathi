"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImagePlus, Send } from "lucide-react";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const canPost = content.trim().length > 0;

  function handlePost() {
    // Submit to server in real app
    setContent("");
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3 md:p-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-start gap-2 md:gap-3">
        <div className="h-8 w-8 md:h-10 md:w-10 flex-none overflow-hidden rounded-full bg-white/10">
          <img
            src="/diverse-avatars.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-2 md:gap-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="min-h-[60px] md:min-h-[84px] resize-none border-white/10 bg-white/7 text-slate-100 placeholder:text-slate-500 focus-visible:ring-cyan-400/30 text-sm break-words"
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 px-2 border-white/10 bg-transparent text-slate-300 hover:bg-white/5 w-full sm:w-auto text-xs"
              >
                <ImagePlus className="mr-1 h-3 w-3" />
                Attach
              </Button>

              <div className="flex items-center gap-2">
                <Switch
                  id="anonymous-post"
                  checked={anonymous}
                  onCheckedChange={setAnonymous}
                  className="data-[state=checked]:bg-[#22D3EE] scale-75 md:scale-100"
                />
                <Label
                  htmlFor="anonymous-post"
                  className="text-xs md:text-sm font-normal text-slate-300"
                >
                  Anonymous
                </Label>
              </div>
            </div>

            {/* Right: post button */}
            <Button
              disabled={!canPost}
              onClick={handlePost}
              size="sm"
              className="h-7 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] px-3 text-slate-900 hover:from-[#22D3EE] hover:to-[#60A5FA]/90 disabled:from-white/10 disabled:to-white/10 disabled:text-slate-900 w-full sm:w-auto text-xs"
            >
              <Send className="mr-1 h-3 w-3" />
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
