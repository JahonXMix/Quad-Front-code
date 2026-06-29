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
  const [activeTab, setActiveTab] = useState<"foods" | "categories">("foods");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);

  // Input holatlari
  const [newCategoryName, setNewCategoryName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [showAddFoodForm, setShowAddFoodForm] = useState(false);

  useEffect(() => {
    const savedCats = localStorage.getItem("quad_categories");
    if (savedCats) {
      const parsedCats = JSON.parse(savedCats);
      setCategories(parsedCats);
      if (parsedCats.length > 0) setFoodCategory(parsedCats[0].name);
    }
    const savedFoods = localStorage.getItem("quad_menu_foods");
    if (savedFoods) setFoods(JSON.parse(savedFoods));
  }, []);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const newCat: CategoryItem = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
    };

    const updatedCats = [...categories, newCat];
    setCategories(updatedCats);
    localStorage.setItem("quad_categories", JSON.stringify(updatedCats));
    if (!foodCategory) setFoodCategory(newCat.name);
    setNewCategoryName("");
  };

  const handleDeleteCategory = (id: string) => {
    const filtered = categories.filter((c) => c.id !== id);
    setCategories(filtered);
    localStorage.setItem("quad_categories", JSON.stringify(filtered));
  };

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName || !foodPrice || !foodImage || !foodCategory) return;

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

    setFoodName("");
    setFoodPrice("");
    setFoodImage("");
    setShowAddFoodForm(false);
  };

  const handleDeleteFood = (id: string) => {
    const filtered = foods.filter((f) => f.id !== id);
    setFoods(filtered);
    localStorage.setItem("quad_menu_foods", JSON.stringify(filtered));
  };

  return (
    <div className="min-h-screen bg-[#070A13] p-6 text-white font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Tizim sarlavhasi (Manager Dashboard uslubida) */}
        <h2 className="text-xl font-bold text-white tracking-wide">
          Manager Dashboard
        </h2>

        {/* Ichki boshqaruv tablari va Add Food tugmasi */}
        <div className="flex justify-between items-center bg-[#0F1524] p-3 rounded-xl border border-[#1E293B]/50 shadow-lg">
          <div className="flex bg-[#070A13] p-1 rounded-lg border border-[#1E293B]/30">
            <button
              onClick={() => setActiveTab("foods")}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                activeTab === "foods"
                  ? "bg-[#10B981] text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Foods
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                activeTab === "categories"
                  ? "bg-[#10B981] text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Categories
            </button>
          </div>

          {activeTab === "foods" && (
            <button
              onClick={() => setShowAddFoodForm(!showAddFoodForm)}
              className="bg-[#10B981] hover:bg-[#059669] text-[#070A13] text-xs font-bold px-4 py-2 rounded-lg transition-all transform active:scale-95"
            >
              {showAddFoodForm ? "Yopish" : "+ Yangi Taom"}
            </button>
          )}
        </div>

        {/* ---------------- 🍔 FOODS TAB PANEL ---------------- */}
        {activeTab === "foods" && (
          <div className="space-y-6">
            {showAddFoodForm && (
              <form
                onSubmit={handleAddFood}
                className="bg-[#0F1524] border border-[#1E293B]/50 p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 shadow-xl"
              >
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    Taom nomi
                  </label>
                  <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="Masalan: Burger"
                    className="w-full bg-[#070A13] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    Narxi (so'm)
                  </label>
                  <input
                    type="number"
                    value={foodPrice}
                    onChange={(e) => setFoodPrice(e.target.value)}
                    placeholder="35000"
                    className="w-full bg-[#070A13] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    Rasm URL manzili
                  </label>
                  <input
                    type="text"
                    value={foodImage}
                    onChange={(e) => setFoodImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#070A13] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    Kategoriya tanlang
                  </label>
                  <select
                    value={foodCategory}
                    onChange={(e) => setFoodCategory(e.target.value)}
                    className="w-full bg-[#070A13] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#10B981]"
                  >
                    {categories.map((c) => (
                      <option
                        key={c.id}
                        value={c.name}
                        className="bg-[#0F1524]"
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 text-right pt-2">
                  <button
                    type="submit"
                    className="bg-[#10B981] text-[#070A13] text-xs font-bold px-5 py-2 rounded-lg hover:bg-[#059669]"
                  >
                    Saqlash
                  </button>
                </div>
              </form>
            )}

            {/* To'q fondagi chiroyli taomlar ro'yxati (Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((f) => (
                <div
                  key={f.id}
                  className="bg-[#0F1524] border border-[#1E293B]/50 rounded-xl overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <div className="h-40 w-full bg-[#070A13] overflow-hidden">
                    <img
                      src={f.imageUrl}
                      alt={f.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="mb-4">
                      <span className="text-[10px] text-[#10B981] font-semibold tracking-wider uppercase block mb-1">
                        {f.category}
                      </span>
                      <h4 className="font-bold text-white text-sm truncate">
                        {f.name}
                      </h4>
                      <p className="text-slate-300 font-medium text-xs mt-0.5">
                        {Number(f.price).toLocaleString()} so'm
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-[#1E293B]/30">
                      <button className="flex-1 bg-[#070A13] border border-[#1E293B] text-slate-300 py-1.5 rounded-lg text-xs font-medium hover:text-white transition-all">
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => handleDeleteFood(f.id)}
                        className="bg-red-950/40 text-red-400 border border-red-900/40 px-3 py-1.5 rounded-lg text-xs hover:bg-red-900/60 transition-all"
                      >
                        O'chirish
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- 📁 CATEGORIES TAB PANEL (To'q panel, rasmga mos) ---------------- */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            {/* Yangi kategoriya qo'shish bloki (Aynan rasm dagi input shakli) */}
            <div className="bg-[#0F1524] border border-[#1E293B]/40 p-6 rounded-xl shadow-lg">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-[#10B981]">+</span> Yangi Kategoriya
                Qo'shish
              </h3>
              <form onSubmit={handleAddCategory} className="flex gap-3 w-full">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Kategoriya nomi (Masalan: Burgerlar, Ichimliklar)"
                  className="flex-1 bg-[#070A13] border border-[#1E293B] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#10B981] placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="bg-[#10B981] hover:bg-[#059669] text-[#070A13] text-xs font-bold px-6 py-2.5 rounded-lg transition-all transform active:scale-95 whitespace-nowrap"
                >
                  Qo'shish
                </button>
              </form>
            </div>

            {/* Mavjud kategoriyalar ro'yxati (Rasm bilan 1ga1 bir xil oyna va o'chirish tugmalari) */}
            <div className="bg-[#0F1524] border border-[#1E293B]/40 p-6 rounded-xl shadow-lg space-y-4">
              <h4 className="text-xs font-semibold text-slate-400">
                Mavjud Kategoriyalar ro'yxati:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#070A13] border border-[#1E293B]/70 rounded-lg p-4 flex justify-between items-center shadow-inner"
                  >
                    <span className="text-xs font-semibold text-white tracking-wide">
                      {c.name}
                    </span>

                    {/* Rasm dagi kabi to'q qizil-kulrang 'O'chirish' tugmasi */}
                    <button
                      onClick={() => handleDeleteCategory(c.id)}
                      className="bg-red-950/50 hover:bg-red-900/60 text-red-400 border border-red-900/40 text-[11px] font-medium px-4 py-1.5 rounded-md transition-all active:scale-95"
                    >
                      O'chirish
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menucreate;
