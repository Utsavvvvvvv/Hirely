package com.hirely.hirely.repository;

import com.hirely.hirely.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Integer> {
    @Query("SELECT DISTINCT j FROM JobPost j LEFT JOIN j.postTechStack ts WHERE " +
            "(:keyword IS NULL OR j.postProfile LIKE %:keyword% OR j.postDesc LIKE %:keyword%) AND " +
            "(:minExperience IS NULL OR j.reqExperience >= :minExperience) AND " +
            "(:maxExperience IS NULL OR j.reqExperience <= :maxExperience) AND " +
            "(:techStack IS NULL OR ts = :techStack)")
    List<JobPost> findByFilters(@Param("keyword") String keyword,
                                @Param("minExperience") Integer minExperience,
                                @Param("maxExperience") Integer maxExperience,
                                @Param("techStack") String techStack);
}