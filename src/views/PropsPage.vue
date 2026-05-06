<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Understanding Props in Vue 2
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Props allow you to pass data from a **parent component** to a **child
          component**. It's one of the most important concepts in Vue.
        </p>
      </div>

      <!-- Interactive Demo -->
      <div class="bg-white rounded-3xl shadow-sm p-8 md:p-10 mb-12">
        <h2 class="text-2xl font-semibold mb-8 text-center">
          🔴 Live Demo: Parent → Child
        </h2>

        <div class="grid lg:grid-cols-2 gap-10">
          <!-- Parent -->
          <div>
            <div class="bg-gray-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 class="font-semibold text-lg mb-4 text-blue-700">
                👤 Parent Component
              </h3>
              <p class="text-gray-600 mb-3">Type here to update the message:</p>
              <input
                v-model="parentMessage"
                class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-lg"
                placeholder="Write something..."
              />
              <p class="mt-4 text-sm text-gray-500">
                Parent Data:
                <span class="font-semibold text-blue-600">{{
                  parentMessage
                }}</span>
              </p>
            </div>
          </div>

          <!-- Child -->
          <div>
            <div class="bg-gray-50 border-2 border-purple-200 rounded-2xl p-6">
              <h3 class="font-semibold text-lg mb-4 text-purple-700">
                👶 Child Component
              </h3>
              <ChildDisplay :message="parentMessage" />
            </div>
          </div>
        </div>
      </div>

      <!-- How It Works - Step by Step -->
      <div class="bg-white rounded-3xl p-8 md:p-10 shadow-sm mb-12">
        <h2 class="text-2xl font-semibold mb-8">
          How Props Work (Step by Step)
        </h2>

        <div class="space-y-10">
          <div class="flex gap-6">
            <div
              class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0"
            >
              1
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-2">
                1. Define data in Parent
              </h3>
              <p class="text-gray-600">The parent component holds the data.</p>
            </div>
          </div>

          <div class="flex gap-6">
            <div
              class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0"
            >
              2
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-2">
                2. Pass data using
                <code class="bg-gray-100 px-2 py-1 rounded">v-bind</code> or
                <code>:</code>
              </h3>
              <p class="text-gray-600">
                Use <code>:message="parentMessage"</code> to send data to the
                child.
              </p>
            </div>
          </div>

          <div class="flex gap-6">
            <div
              class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0"
            >
              3
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-2">
                3. Receive data in Child using <code>props</code>
              </h3>
              <p class="text-gray-600">
                The child declares what props it expects to receive.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Code Examples -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Parent Code -->
        <div class="bg-white rounded-3xl p-8 shadow-sm">
          <h3 class="font-semibold text-xl mb-4 text-blue-700">
            Parent Component Code
          </h3>
          <pre
            class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm"
          ><code>&lt;template&gt;
  &lt;ChildDisplay :message="parentMessage" /&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      parentMessage: "Hello from Parent! 👋"
    }
  }
}
&lt;/script&gt;</code></pre>
        </div>

        <!-- Child Code -->
        <div class="bg-white rounded-3xl p-8 shadow-sm">
          <h3 class="font-semibold text-xl mb-4 text-purple-700">
            Child Component (ChildDisplay.vue)
          </h3>
          <pre
            class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm"
          ><code>&lt;template&gt;
  &lt;div class="p-6 bg-purple-50 rounded-2xl"&gt;
    &lt;p class="text-lg"&gt;
      Message from Parent: 
      &lt;strong&gt;{{ message }}&lt;/strong&gt;
    &lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: "No message received"
    }
  }
}
&lt;/script&gt;</code></pre>
        </div>
      </div>

      <!-- Key Rules -->
      <div class="mt-12 bg-amber-50 border border-amber-200 rounded-3xl p-8">
        <h3 class="font-semibold text-xl mb-6 text-amber-800">
          Important Rules to Remember
        </h3>
        <ul class="space-y-4 text-amber-700">
          <li class="flex items-start gap-3">
            <span class="text-xl">🔒</span>
            <span
              ><strong>One-way data flow</strong>: Parent → Child. Child cannot
              modify the prop directly.</span
            >
          </li>
          <li class="flex items-start gap-3">
            <span class="text-xl">📨</span>
            <span
              >Use <strong>$emit()</strong> if the child needs to send data back
              to the parent.</span
            >
          </li>
          <li class="flex items-start gap-3">
            <span class="text-xl">✅</span>
            <span
              >You can validate props with <code>type</code>,
              <code>required</code>, and <code>default</code>.</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ChildDisplay from "@/components/ChildDisplay.vue";

export default {
  name: "PropsPage",
  components: { ChildDisplay },
  data() {
    return {
      parentMessage: "Hello from Parent! 👋 Change me!",
    };
  },
};
</script>
