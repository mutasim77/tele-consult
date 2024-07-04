type CategoryListProps = {
    categories: string[];
}

export default function CategoryList({ categories }: CategoryListProps) {
    return (
        <div className="w-full md:w-1/4 p-4 bg-light-background dark:bg-dark-background">
            <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Categories</h2>
            {categories.map((category, index) => (
                <div key={index} className="mb-2 text-light-secondary dark:text-dark-secondary">
                    {category}
                </div>
            ))}
        </div>
    )
}