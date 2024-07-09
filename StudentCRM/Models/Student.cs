namespace StudentCRM.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Group { get; set; }
        public int[] Grades { get; set; }
        public bool HasScholarship { get; set; }
    }
}
