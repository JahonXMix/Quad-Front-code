import React, { useState, useEffect } from "react";

interface CategoryItem {
  id: string;
  name: string;
}

interface FoodItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
}

const Menucreate = () => {
  // 🗂️ Faol tabni aniqlash: 'foods' yoki 'categories'
  const [activeTab, setActiveTab] = useState<"foods" | "categories">("foods");

  // 📝 Ma'lumotlar ombori holatlari
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);

  // 📥 Input holatlari (Kategoriya uchun)
  const [newCategoryName, setNewCategoryName] = useState("");

  // 📥 Input holatlari (Taom uchun)
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [showAddFoodForm, setShowAddFoodForm] = useState(false);

  // 🔄 Tizim yuklanganda xotiradan ma'lumotlarni real o'qib olish
  useEffect(() => {
    const savedCats = localStorage.getItem("quad_categories");
    if (savedCats) {
      const parsedCats = JSON.parse(savedCats);
      setCategories(parsedCats);
      if (parsedCats.length > 0) setFoodCategory(parsedCats[0].name);
    }

    const savedFoods = localStorage.getItem("quad_menu_foods");
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods));
    }
  }, []);

  // ➕ 1. KATEGORIYA QO'SHISH (Real Mantiq)
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return alert("Kategoriya nomini kiriting!");

    const newCat: CategoryItem = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
    };

    const updatedCats = [...categories, newCat];
    setCategories(updatedCats);
    localStorage.setItem("quad_categories", JSON.stringify(updatedCats));

    if (!foodCategory) setFoodCategory(newCat.name); // birinchi kategoriya bo'lsa avtomat tanlanadi
    setNewCategoryName("");
  };

  // 🗑️ 2. KATEGORIYA O'CHIRISH
  const handleDeleteCategory = (id: string) => {
    if (window.confirm("Ushbu kategoriyani o'chirishni xohlaysizmi?")) {
      const filtered = categories.filter((c) => c.id !== id);
      setCategories(filtered);
      localStorage.setItem("quad_categories", JSON.stringify(filtered));
    }
  };

  // ➕ 3. TAOM QO'SHISH (Real Mantiq)
  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName || !foodPrice || !foodImage || !foodCategory) {
      return alert("Iltimos, barcha maydonlarni to'ldiring!");
    }

    const newFood: FoodItem = {
      id: Date.now().toString(),
      name: foodName,
      price: foodPrice,
      imageUrl: foodImage,
      category: foodCategory,
    };

    const updatedFoods = [...foods, newFood];
    setFoods(updatedFoods);
    localStorage.setItem("quad_menu_foods", JSON.stringify(updatedFoods));

    // Formani tozalash va yopish
    setFoodName("");
    setFoodPrice("");
    setFoodImage("");
    setShowAddFoodForm(false);
  };

  // 🗑️ 4. TAOMNI O'CHIRISH
  const handleDeleteFood = (id: string) => {
    if (window.confirm("Ushbu taomni menyudan o'chirishni xohlaysizmi?")) {
      const filtered = foods.filter((f) => f.id !== id);
      setFoods(filtered);
      localStorage.setItem("quad_menu_foods", JSON.stringify(filtered));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        {/* Sarlavha */}
        <h2 className="text-xl font-bold text-slate-900 mb-6">Menu</h2>

        {/* 🎛️ TAB BUTTONS (Rasmda ko'ringanidek Foods va Categories) */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit space-x-1 mb-6">
          <button
            onClick={() => setActiveTab("foods")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "foods"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Foods
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "categories"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Categories
          </button>
        </div>

        {/* ---------------- 🍔 FOODS TAB PANEL ---------------- */}
        {activeTab === "foods" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-500">
                Taomlar ro'yxati ({foods.length})
              </h3>
              <button
                onClick={() => setShowAddFoodForm(!showAddFoodForm)}
                className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 transition-all"
              >
                {showAddFoodForm ? "Yopish" : "➕ Add"}
              </button>
            </div>

            {/* Taom qo'shish modal/formasi */}
            {showAddFoodForm && (
              <form
                onSubmit={handleAddFood}
                className="bg-slate-50 border border-slate-200 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn"
              >
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Taom nomi
                  </label>
                  <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="Classic Burger"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Narxi (so'm)
                  </label>
                  <input
                    type="number"
                    value={foodPrice}
                    onChange={(e) => setFoodPrice(e.target.value)}
                    placeholder="35000"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Rasm URL linki
                  </label>
                  <input
                    type="text"
                    value={foodImage}
                    onChange={(e) => setFoodImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Kategoriya biriktirish
                  </label>
                  <select
                    value={foodCategory}
                    onChange={(e) => setFoodCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                  >
                    {categories.length === 0 ? (
                      <option value="">Avval kategoriya yarating!</option>
                    ) : (
                      categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="md:col-span-2 text-right">
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                  >
                    Saqlash
                  </button>
                </div>
              </form>
            )}

            {/* Taomlar Grid Ro'yxati */}
            {foods.length === 0 ? (
              <p className="text-center text-slate-400 py-10 text-sm">
                Hozircha hech qanday taom qo'shilmagan.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {foods.map((f) => (
                  <div
                    key={f.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group"
                  >
                    <div className="h-40 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={f.imageUrl}
                        alt={f.name}
                        className="w-full h-full object-cover group-hover:scale-102 transition-all"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src =
                            "https://placehold.co/400x300?text=Food")
                        }
                      />
                    </div>
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {f.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm truncate">
                          {f.name}
                        </h4>
                        <p className="text-red-500 font-bold text-xs mt-0.5">
                          {Number(f.price).toLocaleString()} so'm
                        </p>
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-slate-50">
                        <button className="flex-1 bg-slate-50 border border-slate-200 text-slate-600 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-100 transition-all">
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteFood(f.id)}
                          className="bg-red-50 text-red-500 border border-red-100 p-1.5 rounded-lg text-xs hover:bg-red-100 transition-all"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------- 📁 CATEGORIES TAB PANEL ---------------- */}
        {activeTab === "categories" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Yangi Kategoriya Qo'shish Inputi */}
            <form onSubmit={handleAddCategory} className="flex gap-2 max-w-xl">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name"
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-slate-800"
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1 transition-all"
              >
                ➕ Add
              </button>
            </form>

            {/* Kategoriyalar Ro'yxati */}
            <div className="space-y-2 max-w-3xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Mavjud Kategoriyalar
              </h4>
              {categories.length === 0 ? (
                <p className="text-slate-400 text-sm py-4">
                  Kategoriyalar ro'yxati bo'sh.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((c) => (
                    <div
                      key={c.id}
                      className="bg-white border border-slate-200 rounded-xl p-3.5 flex justify-between items-center shadow-sm hover:border-slate-300 transition-all"
                    >
                      <span className="text-sm font-semibold text-slate-800">
                        {c.name}
                      </span>
                      <button
                        onClick={() => handleDeleteCategory(c.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 p-2 rounded-lg transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menucreate;
  