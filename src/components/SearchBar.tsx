"use client";

import { useState } from "react";
import { Search, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { isListening, startListening, stopListening } = useVoiceInput((text) => {
    setSearchTerm(text);
    onSearch(text);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl gap-2 mx-auto"
    >
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for a word..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input pr-10 h-12 text-violet-700 text-lg  font-serif border-violet-500"
          disabled={isLoading}
        />
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-3 top-3 "
            >
              <div className="w-6 h-6 border-2 border-primary rounded-full border-t-transparent animate-spin text " />
            </motion.div>
          ) : (
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-12"
              disabled={isLoading}
            >
              <Search className="h-5 w-5 text-violet-500" />
            </Button>
          )}
        </AnimatePresence>
      </div>
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={isListening ? stopListening : startListening}
        className={`h-12 w-12 border-2 border-violet-500 hover:bg-violet-500 hover:text-white ${
          isListening ? "animate-pulse bg-primary text-primary-foreground" : ""
        }`}
        disabled={isLoading}
      >
        <Mic className="h-5 w-5 text-violet-500 hover:text-white" />
      </Button>
    </motion.form>
  );
}