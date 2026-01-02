"use client";
import { CategoryCard } from "@/app/components/Cards/category-card";
import FaqAccordion from "@/app/components/FAQAccordion/faq-accordion";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  fetchCategories,
  fetchFaqs,
  fetchTopics,
} from "@/app/services/faq.service";
import { MessageCircle, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { SupportCard } from "./support-card";
import { AiOutlineLoading } from "react-icons/ai";
import { IconMap } from "@/app/utils/maping";
import useDebounce from "@/app/hooks/use-debounce";
import { safeParseArray } from "@/app/utils/HelperFunction";

interface FaqItem {
  question: string;
  answer: string;
  points?: string[];
  [key: string]: unknown;
}

interface Category {
  faq_id: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
  articles_count: number;
}

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoadingFaqs, setIsLoadingFaqs] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Record<string, string>[]>([]);

  useEffect(() => {

    const getStoredFaqValues = () => {
    // Categories
    const storedCategories = safeParseArray(
      sessionStorage.getItem("categories")
    );

    if (storedCategories.length > 0) {
      setCategories(storedCategories as Category[]);
    } else {
      fetchCategories().then((data) => {
        setCategories(data);
        sessionStorage.setItem("categories", JSON.stringify(data));
      });
    }

    // Topics
    const storedTopics = safeParseArray(sessionStorage.getItem("topics"));

    if (storedTopics.length > 0) {
      setTopics(storedTopics as Record<string, string>[]);
    } else {
      fetchTopics().then((data) => {
        setTopics(data);
        sessionStorage.setItem("topics", JSON.stringify(data));
      });
    }
  }
  getStoredFaqValues();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeTopic && !selectedCategory && !debouncedSearch.trim()) {
        setFaqs([]);
        return;
      }
      setIsLoadingFaqs(true);
      const data = await fetchFaqs({
        topic_id: activeTopic ?? undefined,
        category_id: selectedCategory ?? undefined,
        search: debouncedSearch.trim() ?? undefined,
      });
      setFaqs(data);
      setIsLoadingFaqs(false);
    };
    fetchData();
  }, [activeTopic, selectedCategory, debouncedSearch]);

  const mappedFaqs = useMemo(
    () =>
      faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
        bullets: faq.points,
      })),
    [faqs]
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-teal-50/30 dark:from-gray-950 dark:via-blue-950/20 dark:to-teal-950/20 transition-colors duration-300 pt-25">
      {/* hero section */}
      <div className="relative text-center max-w-4xl mx-auto">
        <div className="mb-5">
          <h1 className="text-xl md:text-2xl lg:text-3xl tracking-tight text-gray-900">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className="lg:text-lg text-gray-600 ">
            Find quick answers about features, setup, and support.
          </p>
        </div>
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-6 rounded-[20px] bg-white dark:bg-gray-800 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-teal-500/30 focus:outline-none focus:ring-4 focus:ring-white/30 dark:focus:ring-teal-500/30 transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="flex gap-8">
          {/* sideBar */}
          <div className="hidden lg:block w-64 shrink-0 ">
            <div className="sticky top-6">
              <Card className="border border-gray-200/50 dark:border-gray-700/50 shadow-lg dark:shadow-gray-900/50 bg-white dark:bg-gray-800">
                <CardContent className="p-4">
                  <h3 className="text-gray-900 dark:text-white mb-4 px-3">
                    Browse Topics
                  </h3>

                  <nav className="space-y-1">
                    {topics.length > 0 ? (
                      topics.map((topic) => {
                        const Icon = IconMap(topic.icon);
                        const isActive = activeTopic === topic.topic_id;
                        return (
                          <button
                            key={topic.topic_id}
                            onClick={() => setActiveTopic(topic.topic_id)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                              isActive
                                ? "bg-linear-to-r from-blue-600 to-teal-500 text-white shadow-lg"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                isActive ? "text-white" : "text-gray-500"
                              }`}
                            />
                            <span>{topic.name}</span>
                          </button>
                        );
                      })
                    ) : (
                      <div className="flex flex-col gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-5 px-3 py-4 rounded-xl bg-gray-100 animate-pulse"
                          >
                            <div className="w-6 h-6 rounded bg-white dark:bg-gray-700" />
                            <div className="h-2 w-38 rounded bg-white" />
                          </div>
                        ))}
                      </div>
                    )}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Main Content Area */}
          <main className="flex-1 space-y-12">
            {!activeTopic && !selectedCategory && !debouncedSearch.trim() ? (
              <section>
                <h2 className="text-gray-900 dark:text-white mb-6">
                  Browse by Category
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categories.length > 0
                    ? categories.map((category) => (
                        <CategoryCard
                          key={category.faq_id}
                          id={category.faq_id}
                          name={category.name}
                          desc={category.desc}
                          icon={IconMap(category.icon)}
                          color={category.color}
                          articles_count={category.articles_count}
                          onClick={(c) => setSelectedCategory(c)}
                        />
                      ))
                    : Array.from({ length: 4 }).map((_, i) => (
                        <Card
                          key={i}
                          className="border border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-800 "
                        >
                          <CardContent className="px-6 py-1 space-y-4 animate-pulse">
                            <div className="w-14 h-14 rounded-2xl mb-4 bg-gray-200 dark:bg-gray-700" />
                            <div className="h-4 w-3/4 bg-gray-200 mb-2 dark:bg-gray-700 rounded" />
                            <div className="h-3 w-full bg-gray-200 mb-4 dark:bg-gray-700 rounded" />
                            <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                          </CardContent>
                        </Card>
                      ))}
                </div>
              </section>
            ) : (
              <section className="space-y-6">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h2 className="text-gray-900 dark:text-white md:text-lg font-semibold">
                      {searchQuery
                        ? `Search Results (${faqs.length})`
                        : "All Questions"}
                    </h2>
                    {faqs.length > 0 && (
                      <span className="text-gray-600 dark:text-gray-400 text-sm sm:ml-3">
                        {faqs.length}{" "}
                        {faqs.length === 1 ? "question" : "questions"}
                      </span>
                    )}
                  </div>
                  {(activeTopic || selectedCategory) && (
                    <button
                      onClick={() => {
                        setActiveTopic("");
                        setSelectedCategory("");
                        setSearchQuery("");
                      }}
                      className="px-5 py-2 rounded-full bg-linear-to-r from-gray-900 to-gray-700 text-white shadow-lg hover:from-gray-800 hover:to-gray-600 transition-all flex items-center gap-2 text-xs md:text-sm"
                    >
                      &#x21ba; Reset Filters
                    </button>
                  )}
                </div>

                {faqs.length === 0 && (
                  <Card className="border border-gray-200/50 dark:border-gray-700/50 shadow-lg dark:shadow-gray-900/50 bg-white dark:bg-gray-800">
                    <CardContent className="p-12 text-center">
                      <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                        {isLoadingFaqs ? (
                          <AiOutlineLoading className="w-10 h-10 text-gray-400 animate-spin" />
                        ) : (
                          <MessageCircle className="w-10 h-10 text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-gray-900 dark:text-white mb-2">
                        {isLoadingFaqs
                          ? "Please wait..."
                          : "No questions found"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {isLoadingFaqs
                          ? "Finding questions related to your search..."
                          : searchQuery
                          ? "Try adjusting your search or browse by category"
                          : activeTopic !== "all"
                          ? "Try selecting a different topic"
                          : selectedCategory !== "all"
                          ? "Try selecting a different category"
                          : "Browse other categories or topics"}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {!isLoadingFaqs && faqs.length > 0 && (
                  <FaqAccordion
                    faqs={mappedFaqs}
                    styles={{
                      questionStyle: {
                        className: "md:text-[1.1rem]",
                      },
                      answerStyle: {
                        className: "md:text-[0.9rem]",
                      },
                    }}
                  />
                )}
              </section>
            )}
            <SupportCard />
          </main>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
