export default function NutritionalGuide() {
    return (
      <main className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-green-700">🥗 Nutritional Guide</h1>
        <p className="text-center text-gray-600 mt-2">
          Discover healthy eating tips, balanced diet plans, and essential nutrients for a better lifestyle.
        </p>
  
        {/* Section: Healthy Eating Tips */}
        <section className="mt-6 p-6 bg-green-100 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800">Healthy Eating Tips</h2>
          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li>Eat a variety of foods, including fruits, vegetables, and whole grains.</li>
            <li>Stay hydrated by drinking plenty of water.</li>
            <li>Avoid processed and sugary foods as much as possible.</li>
            <li>Include lean proteins and healthy fats in your diet.</li>
            <li>Practice portion control and mindful eating.</li>
          </ul>
        </section>
  
        {/* Section: Essential Nutrients */}
        <section className="mt-6 p-6 bg-yellow-100 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800">Essential Nutrients</h2>
          <p className="mt-3 text-gray-700">Your body needs the following essential nutrients:</p>
          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li><strong>Carbohydrates:</strong> Provide energy (found in grains, fruits, and vegetables).</li>
            <li><strong>Proteins:</strong> Help in muscle building and repair (found in meat, beans, and dairy).</li>
            <li><strong>Fats:</strong> Essential for brain health (found in nuts, oils, and fish).</li>
            <li><strong>Vitamins & Minerals:</strong> Support body functions (found in fruits, vegetables, and dairy).</li>
            <li><strong>Water:</strong> Keeps the body hydrated and supports all bodily functions.</li>
          </ul>
        </section>
  
        {/* Section: Balanced Diet Plan */}
        <section className="mt-6 p-6 bg-blue-100 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800">Balanced Diet Plan</h2>
          <p className="mt-3 text-gray-700">Follow this sample daily meal plan:</p>
          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li><strong>Breakfast:</strong> Oatmeal with fruits and nuts, a glass of milk.</li>
            <li><strong>Lunch:</strong> Grilled chicken with brown rice and steamed vegetables.</li>
            <li><strong>Snack:</strong> Greek yogurt with honey and almonds.</li>
            <li><strong>Dinner:</strong> Baked salmon with quinoa and a side salad.</li>
            <li><strong>Hydration:</strong> Drink at least 8 glasses of water throughout the day.</li>
          </ul>
        </section>
      </main>
    );
  }
      