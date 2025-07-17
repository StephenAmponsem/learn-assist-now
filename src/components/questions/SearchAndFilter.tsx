import { useState } from "react";
import { Search, Filter, SortAsc, Users, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: { course?: string; tags?: string[]; sort?: string }) => void;
}

export const SearchAndFilter = ({ onSearch, onFilter }: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("recent");

  const availableTags = [
    "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
    "History", "Literature", "Economics", "Psychology", "Engineering"
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleCourseChange = (course: string) => {
    setSelectedCourse(course);
    onFilter({ course, tags: selectedTags, sort: sortBy });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    onFilter({ course: selectedCourse, tags: selectedTags, sort });
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFilter({ course: selectedCourse, tags: newTags, sort: sortBy });
  };

  const clearFilters = () => {
    setSelectedCourse("");
    setSelectedTags([]);
    setSortBy("recent");
    setSearchQuery("");
    onSearch("");
    onFilter({});
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Course Filter */}
        <Select value={selectedCourse} onValueChange={handleCourseChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Courses</SelectItem>
            <SelectItem value="math101">Mathematics 101</SelectItem>
            <SelectItem value="phys201">Physics 201</SelectItem>
            <SelectItem value="chem101">Chemistry 101</SelectItem>
            <SelectItem value="cs102">Computer Science 102</SelectItem>
            <SelectItem value="bio101">Biology 101</SelectItem>
          </SelectContent>
        </Select>

        {/* Tags Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Tags
              {selectedTags.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedTags.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableTags.map((tag) => (
              <DropdownMenuItem
                key={tag}
                onClick={() => toggleTag(tag)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{tag}</span>
                  {selectedTags.includes(tag) && (
                    <Badge variant="default" className="ml-2">✓</Badge>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SortAsc className="h-4 w-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSortChange("recent")}>
              <Clock className="mr-2 h-4 w-4" />
              Most Recent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("popular")}>
              <TrendingUp className="mr-2 h-4 w-4" />
              Most Popular
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("unanswered")}>
              <Users className="mr-2 h-4 w-4" />
              Unanswered
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {(selectedCourse || selectedTags.length > 0 || searchQuery) && (
          <Button variant="ghost" onClick={clearFilters} size="sm">
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => toggleTag(tag)}
            >
              {tag} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};