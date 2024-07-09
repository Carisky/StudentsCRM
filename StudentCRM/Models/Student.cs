namespace StudentCRM.Models
{
    public class Student
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int Age { get; set; }
        public required string Group { get; set; }
        public required int[] Grades { get; set; }
        public bool HasScholarship { get; set; }
    }
}
