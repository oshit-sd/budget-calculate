<template>
  <div class="min-h-screen w-full bg-violet-50 flex justify-center">
    <div
      class="max-w-3xl w-full bg-white rounded-xl shadow-md p-4 md:p-6 text-sm md:text-base"
    >
      <div
        v-for="(item, index) in faqs"
        :key="index"
        class="mb-4 border-b border-gray-200"
      >
        <button
          @click="toggle(index)"
          class="w-full text-left flex justify-between items-center py-3 font-medium text-gray-800 focus:outline-none"
        >
          {{ item.question }}
          <span>
            <svg
              v-if="activeIndex === index"
              class="w-5 h-5 transform rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5 transform transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </button>

        <div
          v-show="activeIndex === index"
          class="text-gray-700 mt-2 pl-2 pr-2 pb-3 leading-relaxed"
        >
          {{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeIndex = ref(null);

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const faqs = [
  {
    question: "What is Estimatica?",
    answer:
      "Estimatica is an intelligent project budget calculator that estimates total costs based on manpower, salary structures, and project timelines. It enables teams and organizations to plan smarter and make data-driven financial decisions.",
  },
  {
    question: "How does Estimatica calculate budgets?",
    answer:
      "You can input project roles, team size, salary details, and project duration. Estimatica automatically calculates the total cost and provides a clear breakdown of expenses based on manpower and time.",
  },
  {
    question: "Who can use Estimatica?",
    answer:
      "Project managers, software teams, agencies, and startups use Estimatica to forecast project budgets, allocate resources effectively, and control financial risks before starting development.",
  },
  {
    question: "Can I customize roles and salaries?",
    answer:
      "Yes. Estimatica allows full customization — you can define unique team roles, set custom salaries, and modify project durations for accurate cost calculations.",
  },
  {
    question: "Can Estimatica export or share reports?",
    answer:
      "Yes. Estimatica generates professional budget reports that can be exported in PDF or Excel format for clients, stakeholders, or internal tracking.",
  },
  {
    question: "Can I manage multiple projects?",
    answer:
      "Absolutely. Estimatica supports managing multiple projects simultaneously, allowing you to compare budgets and optimize your financial planning.",
  },
  {
    question: "Is Estimatica only for software projects?",
    answer:
      "No. Although designed with software teams in mind, Estimatica works for any manpower-based project — including marketing, design, and construction.",
  },
  {
    question: "Can I save and update past calculations?",
    answer:
      "Yes. Estimatica saves your previous project estimates, so you can revisit and update them when project scope or manpower changes.",
  },
  {
    question: "Does Estimatica handle taxes and overhead costs?",
    answer:
      "Yes. You can include additional costs such as taxes, infrastructure, and bonuses to create a realistic and comprehensive project budget.",
  },
  {
    question: "Is my data safe with Estimatica?",
    answer:
      "Definitely. Estimatica uses secure data encryption and strict access control to ensure your salary and project data remain fully confidential.",
  },
];
</script>